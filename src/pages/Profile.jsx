import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  database,
  DEV_DB_ID,
  COLLECTION_ID_THREADS,
  COLLECTION_ID_PROFILES,
} from "../appwriteConfig";
import { Query } from "appwrite";
import Thread from "../components/Thread";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getThreads();
    getProfile();
  }, []);

  const getThreads = async () => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      [Query.orderDesc("$createdAt"), Query.equal("owner_id", id)]
    );
    console.log("response profile:", response);
    setThreads(response.documents);
    console.log(response.documents);
  };

  const getProfile = async () => {
    const data = await database.getDocument(
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      id
    );
    console.log(data);
    setUserProfile(data);
    setLoading(false);
  };

  const toggleFollow = async () => {
    console.log("Follow toggled...");

    const following = user.following; //people that we're following

    if (following.includes(userProfile.$id)) {
      //userProfile -> current id
      const index = following.indexOf(userProfile.$id);
      following.splice(index, 1);
    } else {
      following.push(userProfile.$id);
    }
  };

  if (loading) return;
  return (
    <div className="container mx-auto max-w-[600px]">
      <div className="flex justify-between my-10">
        <div className="py-4">
          <h3 className="text-3xl font-bold ">{userProfile.username}</h3>
          <p>{userProfile.username}</p>

          <div className="py-6">{userProfile.bio}</div>

          <div className="flex gap-2">
            <p className="text-[rgba(97,97,97,1)]">
              {userProfile.follower_count} followers
            </p>
            {userProfile.link && (
              <>
                <p className="text-[rgba(97,97,97,1)]">·</p>
                <a href={userProfile.link} className="text-[rgba(97,97,97,1)]">
                  {userProfile.link}
                </a>{" "}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={userProfile.profile_pic}
            alt=""
          />
          <button
            onClick={toggleFollow}
            className="bg-white text-black py-2 px-4 border text-sm border-black rounded-full cursor-pointer">
            Follow
          </button>
        </div>
      </div>
      <div>
        {threads.map(thread => (
          <Thread key={thread.$id} thread={thread} setThreads={setThreads} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
