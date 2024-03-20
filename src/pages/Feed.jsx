import { useEffect } from "react";
// import { useState } from "react";
import Thread from "../components/Thread";
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from "../appwriteConfig";

const Feed = () => {
  //   const [threads, setThreads] = useState();

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_THREADS
    );
    console.log("response:", response);
  };

  return (
    <div className="container mx-auto max-w-[600px]">
      <Thread />
      <Thread />
      <Thread />
      <Thread />
    </div>
  );
};

export default Feed;
