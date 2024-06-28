import { useEffect, useState } from "react";
import { database, DEV_DB_ID, COLLECTION_ID_PROFILES } from "../appwriteConfig";
import { useAuth } from "../context/AuthContext";

const UserDropdown = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await database.listDocuments(
        DEV_DB_ID,
        COLLECTION_ID_PROFILES
      );
      setUsers(response.documents);
    };
    fetchUsers();
  }, []);

  const handleFollow = async userId => {
    if (user.$id === userId) {
      console.log("You cannot follow yourself!");
      return;
    }

    const following = user.profile.following;
    if (following.includes(userId)) {
      const index = following.indexOf(userId);
      following.splice(index, 1);
    } else {
      following.push(userId);
    }

    const payload = { following: following };

    const response = await database.updateDocument(
      DEV_DB_ID,
      COLLECTION_ID_PROFILES,
      user.$id,
      payload
    );
    console.log("Updated following list:", response);
  };

  return (
    <div>
      <select
        onChange={e => setSelectedUser(e.target.value)}
        value={selectedUser}>
        <option value="">Select a user</option>
        {users.map(usr => (
          <option key={usr.$id} value={usr.$id}>
            {usr.username}
          </option>
        ))}
      </select>
      {selectedUser && (
        <button onClick={() => handleFollow(selectedUser)}>
          {user.profile.following.includes(selectedUser)
            ? "Unfollow"
            : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserDropdown;
