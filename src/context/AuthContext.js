import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshUserData } from "api/auth";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false); 
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const { token: newToken, ...userData } = await refreshUserData(token)
      Cookies.set("token", newToken);
      setIsAuth(true);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsAuth(false);
      Cookies.remove("token");
    } finally {
      setLoading(false); 
    }
  };

  const login = (token, userData) => {
    Cookies.set("token", token);
    setIsAuth(true);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
