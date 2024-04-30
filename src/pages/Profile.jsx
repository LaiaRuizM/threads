import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from "../appwriteConfig";
import { Query } from "appwrite";
import Thread from "../components/Thread";

const Profile = () => {
  const [threads, setThreads] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      [Query.orderDesc("$createdAt"), Query.equal("owner_id", id)]
    );
    console.log("response profile:", response);
    setThreads(response.documents);
    console.log(response.documents);
    console.log(threads);
  };

  return (
    <div className="container mx-auto max-w-[600px]">
      <div>
        {threads.map(thread => (
          <Thread key={thread.$id} thread={thread} setThreads={setThreads} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
