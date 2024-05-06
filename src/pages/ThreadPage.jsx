import Thread from "../components/Thread";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { database, DEV_DB_ID, COLLECTION_ID_COMMENTS } from "../appwriteConfig";
import { ID } from "appwrite";
import { useAuth } from "../context/AuthContext";

const ThreadPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [thread, setThread] = useState(null);
  const [commentBody, setCommentBody] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    getThread();
  }, []);

  const getThread = async () => {
    const response = await database.getDocument(
      DEV_DB_ID,
      COLLECTION_ID_COMMENTS,
      id
    );
    setThread(response);
    setLoading(false);
  };

  const handleCommentSubmit = async e => {
    e.preventDefault();

    const payload = {
      owner_id: user.$id,
      thread_id: id,
      body: commentBody,
      //image: commentImg,
    };

    const response = await database.createDocument(
      DEV_DB_ID,
      COLLECTION_ID_COMMENTS,
      ID.unique(),
      payload
    );

    console.log("RESPONSE:", response);
    setCommentBody("");
    //setCommentImg(null);
  };

  // const handleDeleteThread = async threadId => {
  //   await database.deleteDocument(DEV_DB_ID, COLLECTION_ID_THREADS, threadId);
  //   console.log("Thread was deleted!");
  //   setThreads(prevState => prevState.filter(item => item.$id !== threadId));
  // };

  if (loading) return;

  return (
    <>
      <Thread thread={thread} setThreads />

      <div className="p-4">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="rounded-lg p-4 w-full bg-[rgba(29,29,29,1)]"
            required
            name="body"
            placeholder="Say something..."
            value={commentBody}
            onChange={e => {
              setCommentBody(e.target.value);
            }}></textarea>

          <div className="flex justify-end items-center border-y py-2  border-[rgba(49,49,50,1)]">
            <input
              className="bg-white text-black py-2 px-4 border text-sm border-black rounded cursor-pointer"
              type="submit"
              value="Post"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ThreadPage;
