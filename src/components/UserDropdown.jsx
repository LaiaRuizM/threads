import React, { useState, useEffect } from "react";
import { database, DEV_DB_ID, COLLECTION_ID_PROFILES } from "../appwriteConfig";
import { useAuth } from "../context/AuthContext";

const UserDropdown = () => {
  const { user, setUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    setUser({ ...user, profile: { ...user.profile, following: following } });
    console.log("Updated following list:", response);
  };

  const filteredUsers = users.filter(selectedUser =>
    selectedUser.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="py-2 px-4 w-full bg-white border border-gray-300 rounded-md"
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 100)}
      />
      {dropdownOpen && (
        <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
          {users.map(selectedUser => (
            <div
              key={selectedUser.$id}
              className="p-4 flex justify-between items-center border-b border-gray-200">
              <span className="text-black">{selectedUser.username}</span>
              <button
                onClick={() => handleFollow(selectedUser.$id)}
                className={
                  user.profile.following.includes(selectedUser.$id)
                    ? "ml-4 bg-black text-white py-2 px-4 border text-sm border-black-500 rounded-full cursor-pointer"
                    : "ml-4 bg-white text-black py-2 px-4 border text-sm border-black rounded-full cursor-pointer"
                }>
                {user.profile.following.includes(selectedUser.$id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
