// import React from 'react';
import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Repeat,
  Send,
} from "react-feather";

const Feed = () => {
  return (
    <div className="container mx-auto max-w-[600px]">
      <div className="flex p-4">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
          alt=""
        />
        <div className="w-full px-2">
          {/* Thread header*/}
          <div className="flex justify-between gap-2">
            <strong>Laia</strong>

            <div className="flex justify-between gap-2">
              <p className="text-[rgba(97,97,97,1)]">3hrs ago</p>
              <MoreHorizontal />
            </div>
          </div>

          {/* Thread body*/}
          <div className="py-4">
            <span>
              Zuckerberg claims that this app has already 30M users. If that is
              true it is fkin impressive.
            </span>
          </div>

          <div className="flex gap-4 py-4">
            <Heart size={22} />
            <MessageCircle size={22} />
            <Repeat size={22} />
            <Send size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
