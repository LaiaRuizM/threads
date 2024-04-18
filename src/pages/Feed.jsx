import { useEffect, useState } from "react";
import { Image } from "react-feather";
import Thread from "../components/Thread";
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from "../appwriteConfig";
// import { Query } from "appwrite";
import { ID } from "appwrite";

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

  const handleThreadSubmit = async e => {
    e.preventDefault();

    const payload = {
      owner_id: "65fa532446ea5da20a24",
      body: threadBody,
      image: null,
    };

    const response = await database.createDocument(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      ID.unique(),
      payload
    );

    console.log("RESPONSE:", response);
    setThreads(prevState => [response, ...prevState]);
    setThreadBody("");
  };

  return (
    <div className="container mx-auto max-w-[600px]">
      <div className="p-4">
        <form onSubmit={handleThreadSubmit}>
          <textarea
            className="rounded-lg p-4 w-full bg-[rgba(29,29,29,1)]"
            required
            name="body"
            placeholder="Say something..."
            value={threadBody}
            onChange={e => {
              setThreadBody(e.target.value); //update body
            }}></textarea>
          <div className="flex justify-between items-center">
            <Image size={24} />
            <input
              className="bg-white text-black py-2 px-4 border text-sm border-black rounded"
              type="submit"
              value="Post"
            />
          </div>
        </form>
      </div>

      {threads.map(thread => (
        <Thread key={thread.$id} thread={thread} />
      ))}
    </div>
  );
};

export default Feed;
