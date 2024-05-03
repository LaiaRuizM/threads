import { useEffect, useState, useRef } from "react";
import { Image } from "react-feather";
import Thread from "../components/Thread";
import {
  database,
  storage,
  DEV_DB_ID,
  COLLECTION_ID_THREADS,
  BUCKET_ID_IMAGES,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { useAuth } from "../context/AuthContext";

const Feed = () => {
  const [threads, setThreads] = useState([]);
  const [threadBody, setThreadBody] = useState("");
  const [threadImg, setThreadImg] = useState(null);

  const { user } = useAuth();

  const fileRef = useRef(null);

  useEffect(() => {
    getThreads();
  }, []);

  const getThreads = async () => {
    const following = user.profile.following;
    console.log("following:", following);
    let feedPosts = [];

    for (let i = 0; following.length > i; i++) {
      console.log("following[i].$id");
      let response = await database.listDocuments(
        DEV_DB_ID,
        COLLECTION_ID_THREADS,
        [
          Query.orderDesc("$createdAt"),
          Query.equal("owner_id", following[i]),
          Query.limit(1), //one item - return an array
        ]
      );
      feedPosts = [...feedPosts, ...response.documents];
    }
    console.log("feedPosts:", feedPosts);
    setThreads(feedPosts);

    // const response = await database.listDocuments(
    //         DEV_DB_ID,
    //         COLLECTION_ID_THREADS,
    //         [
    //           Query.orderDesc("$createdAt"),
    //           Query.equal("owner_id", following[i].$id),
    //         ])

    /* 
    1 - Get following ids* 
    2 - Get Profiles
    3 - Get their latest post
    4 -  Add additional post if necessary 
    */

    //   const response = await database.listDocuments(
    //     DEV_DB_ID,
    //     COLLECTION_ID_THREADS,
    //     [Query.orderDesc("$createdAt")]
    //   );
    //   console.log("response feed:", response);
    // setThreads(feedPosts);
    //   console.log(response.documents);
  };

  const handleThreadSubmit = async e => {
    e.preventDefault();

    const payload = {
      owner_id: user.$id,
      body: threadBody,
      image: threadImg,
      // image: null,
    };

    const response = await database.createDocument(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      ID.unique(),
      payload
    );

    console.log("RESPONSE:", response);
    setThreads(prevState => [response, ...prevState]); // previous state will be the original threads
    setThreadBody("");
    setThreadImg(null);
  };

  const handleDeleteThread = async threadId => {
    await database.deleteDocument(DEV_DB_ID, COLLECTION_ID_THREADS, threadId);
    console.log("Thread was deleted!");
    setThreads(prevState => prevState.filter(item => item.$id !== threadId));
  };

  const handleClick = async () => {
    fileRef.current.click();
  };

  const handleFileChange = async e => {
    const fileObj = e.target.files && e.target.files[0];
    console.log("fileObj:", fileObj);

    if (!fileObj) {
      return;
    }

    const response = await storage.createFile(
      BUCKET_ID_IMAGES,
      ID.unique(),
      fileObj
    );

    const imagePreview = storage.getFilePreview(BUCKET_ID_IMAGES, response.$id);
    setThreadImg(imagePreview.href);

    // console.log("FILE:", response);
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

          <img src={threadImg} alt="Thread image" />

          <input
            style={{ display: "none" }}
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
          />

          <div className="flex justify-between items-center border-y py-2  border-[rgba(49,49,50,1)]">
            <Image onClick={handleClick} className="cursor-pointer" size={24} />
            <input
              className="bg-white text-black py-2 px-4 border text-sm border-black rounded cursor-pointer"
              type="submit"
              value="Post"
            />
          </div>
        </form>
      </div>

      {threads.map(thread => (
        <Thread
          key={thread.$id}
          thread={thread}
          setThreads={setThreads}
          onDelete={handleDeleteThread}
        />
      ))}
    </div>
  );
};

export default Feed;
