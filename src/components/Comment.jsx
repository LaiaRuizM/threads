import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  // MoreHorizontal,
  Heart,
  // MessageCircle,
  // Repeat,
  // Send,
  //Trash2,
} from "react-feather";
import {
  functions,
  database,
  DEV_DB_ID,
  COLLECTION_ID_PROFILES,
  COLLECTION_ID_COMMENTS,
} from "../appwriteConfig";
import { useAuth } from "../context/AuthContext";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addLocale(en);

const Comment = ({ comment }) => {
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [commentInstance, setCommentInstance] = useState(comment);
  const { user } = useAuth();

  useEffect(() => {
    getUserInfo();
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
    setLoading(false);
  };

  const toggleLike = async () => {
    console.log("Liked toggled:", comment);

    const users_who_liked = comment.users_who_liked;

    if (users_who_liked.includes(user.$id)) {
      const index = users_who_liked.indexOf(user.$id);
      users_who_liked.splice(index, 1);
    } else {
      users_who_liked.push(user.$id); //adding to the array
    }

    const payload = {
      users_who_liked: users_who_liked,
      likes: users_who_liked.length,
    };

    const response = await database.updateDocument(
      DEV_DB_ID,
      COLLECTION_ID_COMMENTS,
      comment.$id,
      payload
    );

    setCommentInstance(response);
  };

  if (loading) return;

  return (
    <div className="flex p-4">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={owner.profile_pic}
        // src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
      />

      <div className="w-full px-2 pb-4 border-b border-[rgba(97,97,97,1)]">
        {/* Thread Header */}
        <div className="flex justify-between gap-2">
          <strong> FIX IT comments! {owner.name} </strong>

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
        <div className="py-4 text-white" style={{ whiteSpace: "pre-wrap" }}>
          {comment.body}
          {/* {comment.image && (
              <img
                className="object-cover border border-[rgba(49,49,50,1)] rounded-md"
                src={comment.image}
              />
            )} */}
        </div>

        <div className="flex gap-4 py-4">
          <Heart
            onClick={toggleLike}
            size={22}
            className="cursor-pointer"
            color={
              commentInstance?.users_who_liked.includes(user.$id)
                ? "#ff0000"
                : "#fff"
            }
          />
          {/* <MessageCircle size={22} color={"#fff"} /> */}
          {/* <Repeat size={22} />
          <Send size={22} /> */}
        </div>

        <div className="flex gap-4">
          {/* <p className="text-[rgba(97,97,97,1)]">16 Replies</p>
          <p className="text-[rgba(97,97,97,1)]">·</p> */}
          <p className="text-[rgba(97,97,97,1)]">
            {commentInstance?.likes} Likes
          </p>
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
