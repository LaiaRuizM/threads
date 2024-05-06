import Thread from "../components/Thread";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from "../appwriteConfig";
const ThreadPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState(null);

  useEffect(() => {
    getThread();
  }, []);

  const getThread = async () => {
    const response = await database.getDocument(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      id
    );
    setThread(response);
    setLoading(false);
  };

  if (loading) return;

  return (
    <>
      <Thread thread={thread} setThreads />
    </>
  );
};

export default ThreadPage;
