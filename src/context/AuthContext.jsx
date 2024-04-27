import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = children => {
  const [loading, setLoading] = useState(true);
  console.log(setLoading);
  const contextData = {};
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
