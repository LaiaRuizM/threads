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
  const { username } = useParams(); // username instead of id

  useEffect(() => {
    getThreads();
    getProfile();
  }, []);

  const getThreads = async owner_id => {
    const response = await database.listDocuments(
      DEV_DB_ID,
      COLLECTION_ID_THREADS,
      [Query.orderDesc("$createdAt"), Query.equal("owner_id", owner_id)] //userProfile.$id instead of id
    );
    console.log("response profile:", response);
    setThreads(response.documents);
    console.log(response.documents);
  };

  const getProfile = async () => {
    const data = await database.listDocuments(
      //instead of getDocuments
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      [
        //username // username instead of id
        Query.equal("username", username),
        Query.limit(1), //one item - return an array
      ]
    );
    console.log("data:", data.documents[0]);
    getThreads(data.documents[0].$id);
    setUserProfile(data.documents[0]);
    setLoading(false);
  };

  const toggleFollow = async () => {
    if (user.$id === userProfile.$id) {
      console.log("You cannot follow yourself!");
      return;
    }

    console.log("Follow toggled...");

    const following = user.profile.following; //people that we're following
    const followers = userProfile.followers; //people following the user profile

    if (following.includes(userProfile.$id)) {
      //userProfile -> current id
      // Remove from following
      const index = following.indexOf(userProfile.$id);
      following.splice(index, 1);
    } else {
      // Add to following
      following.push(userProfile.$id);
    }

    if (followers.includes(user.$id)) {
      //userProfile -> current id
      // Remove from followers
      const index = followers.indexOf(user.$id);
      followers.splice(index, 1);
    } else {
      // Add to followers
      followers.push(user.$id);
    }

    //Update both users
    const payload1 = {
      following: following,
    };

    console.log("payload1:", payload1);

    const payload2 = {
      followers: followers,
      follower_count: followers.length,
    };

    console.log("payload1:", payload1);
    console.log("payload2:", payload2);

    //update doc - response 1 is going to update our user
    const response1 = await database.updateDocument(
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      user.$id,
      payload1
    );

    console.log("response1:", response1);

    //update doc - response 2 is going to update our userProfile
    const response2 = await database.updateDocument(
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      userProfile.$id,
      payload2
    );

    console.log("response2:", response2);

    // Update userProfile state to reflect changes
    setUserProfile(prevState => ({
      ...prevState,
      followers: followers,
      follower_count: followers.length,
    }));
  };

  if (loading) return;
  return (
    <>
      <div className="w-full flex justify-between">
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
                <a
                  href={userProfile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(97,97,97,1)]">
                  {userProfile.link}
                </a>{" "}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-center">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={userProfile.profile_pic}
            alt=""
          />
          {user.profile.following.includes(userProfile.$id) ? (
            <button
              onClick={toggleFollow}
              className="text-white py-2 px-4 border text-sm border-white rounded-full cursor-pointer">
              Following
            </button>
          ) : (
            <button
              onClick={toggleFollow}
              className="bg-white text-black py-2 px-4 border text-sm border-black rounded-full cursor-pointer">
              Follow
            </button>
          )}
        </div>
      </div>
      <div>
        {threads.map(thread => (
          <Thread key={thread.$id} thread={thread} setThreads={setThreads} />
        ))}
      </div>
    </>
  );
};

export default Profile;

// USER:
//1.- This object represents the currently logged-in user. It's used for operations related to the authenticated user, such as following other users.
//2.- Is typically obtained from the authentication context (useAuth()), indicating it's the currently authenticated user.
// USERPROFILE:
//1.- This object represents the profile of the user whose profile page we are currently viewing. It's used to display profile information such as username, bio, profile picture, followers, etc.
//2.- Is fetched by querying documents from the database, specifically retrieving the profile of the user whose username matches the parameter in the URL (username).
