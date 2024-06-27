import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  COLLECTION_ID_PROFILES,
  DEV_DB_ID,
  account,
  database,
} from "../appwriteConfig";
import { ID } from "appwrite"; // We need it to generate an user ID
import PropTypes from "prop-types";
// import "../index.css";
import { ClipLoader } from "react-spinners";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();

      let profile = await database.getDocument(
        DEV_DB_ID,
        COLLECTION_ID_PROFILES,
        accountDetails.$id
      );
      console.log("profile:", profile);

      accountDetails["profile"] = profile;
      console.log(accountDetails);

      setUser(accountDetails);
    } catch (error) {
      console.log("ERROR:", error);
    }
    setLoading(false);
  };

  const loginUser = async userInfo => {
    setLoading(true);

    console.log("userInfo", userInfo);
    try {
      // await account.deleteSession("current");

      const response = await account.createEmailSession(
        //createEmailPasswordSession
        userInfo.email,
        userInfo.password
      );

      let accountDetails = await account.get();
      console.log("SESSION:", response);
      setUser(accountDetails);
      // navigate("/");
    } catch (error) {
      console.log("ERROR:", error);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    console.log("Logout clicked");
    await account.deleteSession("current");
    setUser(null);
    navigate("/login");
  };

  const registerUser = async userInfo => {
    setLoading(true);

    try {
      //Create an account:
      let response = await account.create(
        ID.unique(), // To create appwrite's user id
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );

      console.log("response:", response);

      //Create the collection's document (after creating the account)
      await database.createDocument(
        DEV_DB_ID,
        COLLECTION_ID_PROFILES,
        response.$id, // Use the user's ID as Document_ID
        {
          user_id: response.$id, // Use user's ID as user_id
          profile_pic: userInfo.profile_pic, // Add profile_pic
          username: userInfo.username, // Add username
        }
      );

      await account.createEmailSession(userInfo.email, userInfo.password1);
      let accountDetails = await account.get();
      setUser(accountDetails);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const contextData = {
    //contextData -> object with the state that we pass down
    user,
    loginUser,
    logoutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {/* {loading ? <div className="spinner"></div> : children} */}
      {loading ? <ClipLoader color="#000" size={40} /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

//Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
