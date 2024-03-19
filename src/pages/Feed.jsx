// import React from 'react';
import { MoreHorizontal } from "react-feather";

const Feed = () => {
  return (
    <div className="container mx-auto w-[600px]">
      <div className="flex">
        <img
          className="w-12 rounded-full object-cover"
          src="https://media.licdn.com/dms/image/D4D03AQFP5XYJUdkTsQ/profile-displayphoto-shrink_800_800/0/1670778116949?e=1715817600&v=beta&t=QcRpQ80IauDBs75MWuTLCScZd1fsBmMtiMbW1o_4ya0"
          alt=""
        />
        <div className="w-full p-2">
          <div className="flex justify-between gap-2">
            <strong>Laia</strong>

            <div>
              <p>3hrs ago</p>
              <MoreHorizontal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
