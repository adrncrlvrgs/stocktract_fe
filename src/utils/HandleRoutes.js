import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import { useAuth } from "context/AuthContext";

const HandleRoutes = ({ routes }) => {
  // Assuming `useAuth` returns `isAuth` to indicate if the user is authenticated
  // const { isAuth } = useAuth();

  const isAuth = true; // Replace this with actual auth logic

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, component: Component, access, subRoutes } = route;

      // Handle authentication checks
      if (access === "private" && !isAuth) {
        return <Route key={index} path={path} element={<Navigate to="/login" />} />;
      }

      if (access === "public" && isAuth) {
        return <Route key={index} path={path} element={<Navigate to="/dashboard" />} />;
      }

      return (
        <Route
          key={index}
          path={path}
          element={
            <Component>
              {/* Render subroutes if present */}
              {subRoutes && subRoutes.length > 0 && (
                <Routes>{renderRoutes(subRoutes)}</Routes>
              )}
            </Component>
          }
        />
      );
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default HandleRoutes;
