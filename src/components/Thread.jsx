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
  // EXECUTION_METHOD,
  COLLECTION_ID_THREADS,
  DEV_DB_ID,
  COLLECTION_ID_PROFILES,
} from "../appwriteConfig";
import { Link } from "react-router-dom";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

import setThreads from "../pages/feed";
import { useAuth } from "../context/AuthContext";

// TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

const Thread = ({ thread }) => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [threadInstance, setThreadInstance] = useState(thread);
  const { user } = useAuth(); //user.$id -> authenticated user

  useEffect(() => {
    //Get Owner information
    getUserInfo();
    // setLoading(false);
  }, []);

  const getUserInfo = async () => {
    const payload = {
      owner_id: thread.owner_id,
      // name: thread.name,
      // name: thread.name,
    };

    const response = await functions.createExecution(
      "65fcd9a01714d2327a1d", //Function ID
      JSON.stringify(payload)
      // EXECUTION_METHOD
    );
    const profile = await database.getDocument(
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      thread.owner_id
    );
    console.log("profile:", profile);

    // console.log("response thread:", response);

    // const userData = JSON.parse(response.response);
    const userData = response;
    userData["profile_pic"] = profile.profile_pic;
    userData["username"] = profile.username;

    // console.log("GET USER REP:", response);
    // console.log("GET USER REP:", userData);
    setOwner(userData);
    setLoading(false);
  };

  // function_id = 65fcd9a01714d2327a1d

  const handleDelete = async () => {
    await database.deleteDocument(DEV_DB_ID, COLLECTION_ID_THREADS, thread.$id);
    console.log("Thread was deleted!");
    setThreads(prevState => prevState.filter(item => item.$id !== thread.$id));
    // window.location.reload();
  };

  const toggleLike = async () => {
    console.log("Liked toggled");

    const users_who_liked = thread.users_who_liked;

    if (users_who_liked.includes(user.$id)) {
      const index = users_who_liked.indexOf(user.$id);
      users_who_liked.splice(index, 1);
    } else {
      users_who_liked.push(user.$id);
    }

    const payload = {
      users_who_liked: users_who_liked,
      likes: users_who_liked.length,
    };

    const response = await database.updateDocument(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      thread.$id,
      payload
    );

    setThreadInstance(response);
  };

  if (loading) return;

  return (
    <div className="flex p-4">
      <Link to={`/profile/${owner.username}`}>
        {/* thread.owner_id */}
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={owner.profile_pic}
          // src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
          // alt=""
        />
      </Link>

      <div className="w-full px-2 pb-4 border-b border-[rgba(97,97,97,1)]">
        {/* Thread header*/}
        <div className="flex justify-between gap-2">
          {/* <strong>{user.name}</strong> */}
          <strong> FIX IT! {owner.name} </strong>
          <strong> FIX IT! {user.profile.username} </strong>

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
          <Heart
            onClick={toggleLike}
            size={22}
            className="cursor-pointer"
            color={
              threadInstance.users_who_liked.includes(user.$id)
                ? "#ff0000"
                : "#fff"
            }
          />
          <MessageCircle size={22} />
          <Repeat size={22} />
          <Send size={22} />
        </div>

        <div className="flex gap-4">
          <p className="text-[rgba(97,97,97,1)]">16 Replies</p>
          <p className="text-[rgba(97,97,97,1)]">·</p>
          <p className="text-[rgba(97,97,97,1)]">
            {threadInstance.likes} Likes
          </p>
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
    $id: PropTypes.string,
    setThreads: PropTypes.func,
    likes: PropTypes.number,
    users_who_liked: PropTypes.array,
    username: PropTypes.string,
    // name: PropTypes.string,
  }).isRequired,
};

export default Thread;
