import { createContext } from "react";
import React from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authInfo = {
    name: "arvi",
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
