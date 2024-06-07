import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import // MoreHorizontal,
// Heart,
// MessageCircle,
// Repeat,
// Send,
//Trash2,
"react-feather";
import {
  functions,
  database,
  // EXECUTION_METHOD,
  //COLLECTION_ID_THREADS,
  DEV_DB_ID,
  COLLECTION_ID_PROFILES,
} from "../appwriteConfig";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addLocale(en);

const Comment = ({ comment }) => {
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    // getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const payload = {
      owner_id: comment.owner_id,
    };

    const response = await functions.createExecution(
      "65fcd9a01714d2327a1d", //Function ID
      JSON.stringify(payload)
    );

    const profile = await database.getDocument(
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      comment.owner_id
    );

    console.log("profile:", profile);
    const userData = response;
    userData["profile_pic"] = profile.profile_pic;
    userData["username"] = profile.username;
    setOwner(userData);
    // setLoading(false);
  };

  return (
    <div className="flex p-4">
      {/* <img
          className="w-10 h-10 rounded-full object-cover"
          src={owner.profile_pic}
          // src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
        /> */}

      <div className="w-full px-2 pb-4 border-b border-[rgba(97,97,97,1)]">
        {/* Thread Header */}
        <div className="flex justify-between gap-2">
          {/* <strong> FIX IT! {owner.name} </strong> */}

          <div className="flex justify-between gap-2 items-center cursor-pointer">
            <p className="text-[rgba(97,97,97,1)]">
              {
                <ReactTimeAgo
                  date={new Date(comment.$createdAt).getTime()}
                  locale="en-US"
                />
              }
            </p>
            {/* <Trash2 onClick={handleDelete} size={14} /> */}
          </div>
        </div>

        {/* Thread Body */}
        <Link to={`/thread/${comment.$id}`}>
          <div className="py-4 text-white" style={{ whiteSpace: "pre-wrap" }}>
            {comment.body}
            {/* {comment.image && (
              <img
                className="object-cover border border-[rgba(49,49,50,1)] rounded-md"
                src={comment.image}
              />
            )} */}
          </div>
        </Link>

        {/* <div className="flex gap-4 py-4">
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
          <Link to={`/thread/${comment.$id}`}>
            <MessageCircle size={22} color={"#fff"} />
          </Link>
          <Repeat size={22} />
          <Send size={22} />
        </div> */}

        <div className="flex gap-4">
          <p className="text-[rgba(97,97,97,1)]">16 Replies</p>
          <p className="text-[rgba(97,97,97,1)]">·</p>
          {/* <p className="text-[rgba(97,97,97,1)]">
            {threadInstance.likes} Likes
          </p> */}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    owner_id: PropTypes.string.isRequired,
    $createdAt: PropTypes.string.isRequired,
    image: PropTypes.string, //null
    $id: PropTypes.string,
    setThreads: PropTypes.func,
    likes: PropTypes.number,
    users_who_liked: PropTypes.array,
    username: PropTypes.string,
  }).isRequired,
};

export default Comment;
