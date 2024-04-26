import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  // MoreHorizontal,
  Heart,
  MessageCircle,
  Repeat,
  Send,
  Trash2,
} from "react-feather";
import {
  functions,
  database,
  COLLECTION_ID_THREADS,
  DEV_DB_ID,
} from "../appwriteConfig";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

import setThreads from "../pages/feed";

// TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

const Thread = ({ thread }) => {
  const [loading, setLoading] = useState(true);
  // const [owner, setOwner] = useState(null);

  useEffect(() => {
    //Get Owner information
    getUserInfo();
    // setLoading(false);
  }, []);

  const getUserInfo = async () => {
    const payload = {
      owner_id: thread.owner_id,
    };

    const response = await functions.createExecution(
      "65fcd9a01714d2327a1d",
      JSON.stringify(payload)
    );

    console.log("response thread:", response);

    // const userData = JSON.parse(response.response);

    // console.log("GET USER REP:", response);
    // console.log("GET USER REP:", userData);
    // setOwner(userData);
    setLoading(false);
  };

  // function_id = 65fcd9a01714d2327a1d

  const handleDelete = async () => {
    await database.deleteDocument(DEV_DB_ID, COLLECTION_ID_THREADS, thread.$id);
    console.log("Thread was deleted!");
    setThreads(prevState => prevState.filter(item => item.$id !== thread.$id));
    // window.location.reload();
  };

  const toggleLike = () => {
    console.log("Liked toggled");
  };

  if (loading) return;

  return (
    <div className="flex p-4">
      <img
        className="w-10 h-10 rounded-full object-cover"
        // src={owner.profile_pic}
        src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
        alt=""
      />
      <div className="w-full px-2 pb-4 border-b border-[rgba(97,97,97,1)]">
        {/* Thread header*/}
        <div className="flex justify-between gap-2">
          <strong>{thread.owner_id}</strong>
          {/* <strong>{owner.name}</strong> */}

          <div className="flex justify-between gap-2 items-center cursor-pointer">
            {/* <p className="text-[rgba(97,97,97,1)]">3hrs ago</p> */}
            <p className="text-[rgba(97,97,97,1)]">
              {
                <ReactTimeAgo
                  // date={Date.parse(thread.$createdAt)}
                  date={new Date(thread.$createdAt).getTime()}
                  locale="en-US"
                />
              }
            </p>
            {/* <MoreHorizontal /> */}
            <Trash2 onClick={handleDelete} size={14} />
          </div>
        </div>

        {/* Thread body*/}
        <div className="py-4" style={{ whiteSpace: "pre-wrap" }}>
          {thread.body}
          {thread.image && (
            <img
              className="object-cover border border-[rgba(49,49,50,1)] rounded-md"
              src={thread.image}
            />
          )}
        </div>

        <div className="flex gap-4 py-4">
          <Heart onClick={toggleLike} size={22} />
          <MessageCircle size={22} />
          <Repeat size={22} />
          <Send size={22} />
        </div>

        <div className="flex gap-4">
          <p className="text-[rgba(97,97,97,1)]">16 Replies</p>
          <p className="text-[rgba(97,97,97,1)]">·</p>
          <p className="text-[rgba(97,97,97,1)]">{thread.likes} Likes</p>
        </div>
      </div>
    </div>
  );
};

Thread.propTypes = {
  thread: PropTypes.shape({
    body: PropTypes.string,
    owner_id: PropTypes.string.isRequired,
    $createdAt: PropTypes.string.isRequired,
    image: PropTypes.string, //null
    $id: PropTypes.string.isRequired,
    setThreads: PropTypes.func,
    likes: PropTypes.integer,
  }).isRequired,
};

export default Thread;
