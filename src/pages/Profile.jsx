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

const Profile = () => {
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

  if (loading) return;
  return (
    <div className="container mx-auto max-w-[600px]">
      <div>
        <div>
          <h3 className="text-2xl">{userProfile.username}</h3>
          <p>{userProfile.username}</p>
        </div>
        <div>
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={userProfile.profile_pic}
            alt=""
          />
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
