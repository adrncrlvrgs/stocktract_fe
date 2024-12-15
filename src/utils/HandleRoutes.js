import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const HandleRoutes = ({ routes }) => {
  const { isAuth } = useAuth();

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      const { path, component: Component, access, subRoutes } = route;

      // Handle access control (private vs public routes)
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

      // If route doesn't have a component (like /products), render sub-routes
      if (!Component) {
        return (
          <Route
            key={index}
            path={path}
            element={
              <React.Fragment>
                {/* Render sub-routes */}
                {subRoutes && subRoutes.length > 0 && (
                  <Routes>{renderRoutes(subRoutes)}</Routes>
                )}
              </React.Fragment>
            }
          />
        );
      }

      // Default case: Render the component for routes with a component
      return (
        <Route
          key={index}
          path={path}
          element={
            <Component>
              {/* Render sub-routes */}
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
