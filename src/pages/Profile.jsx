import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from "../appwriteConfig";
import { Query } from "appwrite";

const Profile = () => {
  const [threads, setThreads] = useState([]);
  const params = useParams();

  useEffect(() => {
    getThreads();
  });

  //   const getThreads = async () => {
  //     const response = await database.listDocuments(
  //       DEV_DB_ID,
  //       COLLECTION_ID_THREADS,
  //       [Query.orderDesc("$createdAt"), Query.equal("owner_id")]
  //     );
  //     console.log("response feed:", response);
  //     setThreads(response.documents);
  //     console.log(response.documents);
  //   };

  return <div>Profile</div>;
};

export default Profile;
