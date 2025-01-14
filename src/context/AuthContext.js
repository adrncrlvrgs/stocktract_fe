import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshUserData, getUserProfile } from "api/auth";
import { Spinner } from "components/Spinner";
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
      const { token: newToken, role, ...userData } = await refreshUserData(token);
      Cookies.set("token", newToken);
      setIsAuth(true);
      setUser(...userData, role);
    } catch (error) {
      setIsAuth(false);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const profileData = await getUserProfile(token);
        setUser(profileData);
        setIsAuth(true);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsAuth(false);
      Cookies.remove("token");
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
    <AuthContext.Provider
      value={{ isAuth, login, logout, user, loading, fetchProfile }}
    >
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
