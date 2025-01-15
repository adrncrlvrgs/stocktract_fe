import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshUserData } from "api/auth";
import { Spinner } from "components/Spinner";
const AuthContext = createContext({});

const AuthProvider = (props) => {
  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState();
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
      const { token: newToken, userData } = await refreshUserData(token);
      Cookies.set("token", newToken);
      setUser({ userData });
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      Cookies.remove("token");
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    Cookies.set("token", token);
    setIsAuth(true);
    setUser({ userData });

    console.log(user)
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
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
