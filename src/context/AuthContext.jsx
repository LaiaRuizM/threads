import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  COLLECTION_ID_PROFILES,
  DEV_DB_ID,
  account,
  database,
} from "../appwriteConfig";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(false);
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      let accountDetails = await account.get();
      const profile = await database.getDocument(
        DEV_DB_ID,
        COLLECTION_ID_PROFILES
      );
      accountDetails["profile"] = "TEST";
      console.log(accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.log("ERROR:", error);
    }
    setLoading(false);
  };

  const loginUser = async userInfo => {
    try {
      // await account.deleteSession("current");

      const response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );

      const accountDetails = await account.get();
      setUser(accountDetails);
      // navigate("/");
      console.log("response:", response);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const logoutUser = async () => {
    console.log("Logout clicked");
    await account.deleteSession("current");
    setUser(null);
    navigate("/login");
  };
  const contextData = {
    user,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;
