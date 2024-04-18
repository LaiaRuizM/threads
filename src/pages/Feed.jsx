import { useEffect, useState } from "react";
import Thread from "../components/Thread";
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from "../appwriteConfig";
// import { Query } from "appwrite";

const Feed = () => {
  const [threads, setThreads] = useState([]);
  const [threadBody, setThreadBody] = useState("");

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_THREADS
      // [Query.orderDesc("$createdAt")]
    );
    console.log("response:", response);
    setThreads(response.documents);
    console.log(response.documents);
  };

  return (
    <div className="container mx-auto max-w-[600px]">
      <div>
        <form action="">
          <textarea
            required
            name="body"
            placeholder="Say something..."
            value={threadBody}
            onChange={e => {
              setThreadBody(e.target.value);
            }}></textarea>
        </form>
      </div>

      {threads.map(thread => (
        <Thread key={thread.$id} thread={thread} />
      ))}
    </div>
  );
};

export default Feed;
