import React, { useState, useEffect } from "react";
import { database, DEV_DB_ID, COLLECTION_ID_PROFILES } from "../appwriteConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const { user, setUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    //setUser({ ...user, profile: { ...user.profile, following: following } });

    // Update the local users list to reflect the changes immediately
    setUsers(
      users.map(userItem => {
        if (userItem.$id === userId) {
          return {
            ...userItem,
            isFollowed: !userItem.isFollowed,
          };
        }
        return userItem;
      })
    );

    console.log("Updated following list:", response);
  };

  const filteredUsers = users.filter(
    selectedUser =>
      selectedUser.username &&
      selectedUser.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToUserProfile = userId => {
    navigate.push(`/profiles/${userId}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="py-2 text-black px-4 w-full bg-white border border-gray-300 rounded-md"
        onFocus={() => setDropdownOpen(true)} //User clicks on this input or select it using tab.
        onBlur={() => setTimeout(() => setDropdownOpen(false), 100)} //User clicks outside from the input or uses the tab to move to another element.
      />
      {dropdownOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredUsers.map(selectedUser => (
            <div
              key={selectedUser.$id}
              className="p-4 flex justify-between items-center border-b border-gray-200"
              onClick={() => navigateToUserProfile(selectedUser.$id)} // Navegate to user's profile
              style={{ cursor: "pointer" }}>
              <span className="text-black w-full overflow-hidden text-ellipsis">
                {selectedUser.username}
              </span>
              <button
                onMouseDown={e => e.preventDefault()} // Prevent blur on button click
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
