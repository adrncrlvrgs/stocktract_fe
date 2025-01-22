import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshUserData } from "api/auth";
import { Spinner } from "components/Spinner";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUserData(token);
      startTokenRefreshCheck(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const { token: newToken, userData } = await refreshUserData(token);
      Cookies.set("token", newToken);
      setUser(userData);
      setIsAuth(true);
    } catch (error) {
      handleTokenExpiry();
    } finally {
      setLoading(false);
    }
  };

  const handleTokenExpiry = () => {
    setIsAuth(false);
    Cookies.remove("token");
    navigate("/");
  };

  const startTokenRefreshCheck = (token) => {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;
    const timeRemaining = expirationTime - Date.now();

    if (timeRemaining > 0 && timeRemaining < 5 * 60 * 1000) {
      setTimeout(async () => {
        try {
          const { token: newToken, userData } = await refreshUserData(token);
          Cookies.set("token", newToken);
          setUser(userData);
          startTokenRefreshCheck(newToken);
        } catch (error) {
          handleTokenExpiry();
        }
      }, timeRemaining - 60 * 1000);
    } else if (timeRemaining <= 0) {
      handleTokenExpiry();
    }
  };

  const login = (token, userData) => {
    Cookies.set("token", token);
    setIsAuth(true);
    setUser(userData);
    startTokenRefreshCheck(token);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, user, loading }}>
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
