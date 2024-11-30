import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const HandleRoutes = ({ routes }) => {
  const { isAuth } = useAuth();

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, component: Component, access, subRoutes } = route;

      if (access === "private" && !isAuth) {
        return <Route key={index} path={path} element={<Navigate to="/" />} />;
      }

      if (access === "public" && isAuth) {
        return (
          <Route
            key={index}
            path={path}
            element={<Navigate to="/dashboard" />}
          />
        );
      }

      return (
        <Route
          key={index}
          path={path}
          element={
            <Component>
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
