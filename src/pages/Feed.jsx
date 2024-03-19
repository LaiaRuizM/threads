// import React from 'react';
import { MoreHorizontal } from "react-feather";

const Feed = () => {
  return (
    <div className="container mx-auto max-w-[600px]">
      <div className="flex p-4">
        <img
          className="w-12 rounded-full object-cover"
          src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
          alt=""
        />
        <div className="w-full px-2">
          <div className="flex justify-between gap-2">
            <strong>Laia</strong>

            <div className="flex justify-between gap-2">
              <p className="text-[rgba(97,97,97,1)]">3hrs ago</p>
              <MoreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
