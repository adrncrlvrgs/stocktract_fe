import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const ProtectedRoute = ({ access, isAuth, redirectPath, children }) => {
  if (access === "private" && !isAuth) {
    return <Navigate to={redirectPath} />;
  }
  if (access === "public" && isAuth) {
    return <Navigate to="/dashboard" />;
  }
  return children ? children : <Outlet />;
};

const HandleRoutes = ({ routes }) => {
  const { isAuth } = useAuth();

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, component: Component, access, subRoutes } = route;

      return (
        <Route
          key={index}
          path={path}
          element={
            <ProtectedRoute
              access={access}
              isAuth={isAuth}
              redirectPath="/"
            >
              {Component && <Component />}
            </ProtectedRoute>
          }
        >
          {/* Recursively render subRoutes */}
          {subRoutes && renderRoutes(subRoutes)}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default HandleRoutes;
