import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
  };

  const updateUser = (updatedData) => {
    console.log(updatedData);
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    sessionStorage.setItem("userData", JSON.stringify(updatedUser));
  };
  
  const updateSavedPost = () => {

  }



  return (
    <AuthContext.Provider value={{ user, login, logout ,updateUser,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
