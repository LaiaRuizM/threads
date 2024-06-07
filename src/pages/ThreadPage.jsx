import Thread from "../components/Thread";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  database,
  DEV_DB_ID,
  COLLECTION_ID_COMMENTS,
  COLLECTION_ID_THREADS,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";

const ThreadPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [thread, setThread] = useState(null);
  const [commentBody, setCommentBody] = useState("");

  const [comments, setComments] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    getThread();
    getComments();
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
    setComments(prevState => [response, ...prevState]);
    //setCommentImg(null);
  };

  //getComments: to make a request and get all the comments to this thread
  const getComments = async () => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_COMMENTS,
      [[Query.orderDesc("$createdAt"), Query.equal("thread_id", id)]]
    );
    setComments(response.documents); //render those out
  };

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

      <div>
        {comments.map(comment => (
          <Comment key={comment.$id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default ThreadPage;
