import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Repeat,
  Send,
} from "react-feather";
import { functions } from "../appwriteConfig";

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

    const userData = JSON.parse(response.response);

    console.log("GET USER REP:", userData);
    setLoading(false);
  };

  // function_id = 65fcd9a01714d2327a1d

  if (loading) return null;

  return (
    <div className="flex p-4">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
        alt=""
      />
      <div className="w-full px-2 pb-4 border-b border-[rgba(97,97,97,1)]">
        {/* Thread header*/}
        <div className="flex justify-between gap-2">
          <strong>{thread.owner_id}</strong>

          <div className="flex justify-between gap-2">
            <p className="text-[rgba(97,97,97,1)]">3hrs ago</p>
            <MoreHorizontal />
          </div>
        </div>

        {/* Thread body*/}
        <div className="py-4">
          <span>{thread.body}</span>
        </div>

        <div className="flex gap-4 py-4">
          <Heart size={22} />
          <MessageCircle size={22} />
          <Repeat size={22} />
          <Send size={22} />
        </div>

        <div className="flex gap-4">
          <p className="text-[rgba(97,97,97,1)]">16 Replies</p>
          <p className="text-[rgba(97,97,97,1)]">·</p>
          <p className="text-[rgba(97,97,97,1)]">87 Likes</p>
        </div>
      </div>
    </div>
  );
};

Thread.propTypes = {
  thread: PropTypes.shape({
    body: PropTypes.string.isRequired,
    owner_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Thread;
