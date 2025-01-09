import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { Page } from "components/Pages";

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

  const renderRoutes = (
    routes,
    isParentPrivate = false,
    isSubroute = false
  ) => {
    return routes.map((route, index) => {
      const { path, component: Component, access, subRoutes } = route;

      const isPrivate = access === "private" || isParentPrivate;

      return (
        <Route
          key={index}
          path={path}
          element={
            <ProtectedRoute access={access} isAuth={isAuth} redirectPath="/">
              {isPrivate && !isSubroute ? (
                <Page>
                  {Component && <Component />}
                  {!subRoutes && <Outlet />}
                </Page>
              ) : (
                <>
                  {Component && <Component />}
                  {subRoutes && <Outlet />}
                </>
              )}
            </ProtectedRoute>
          }
        >
          {subRoutes && renderRoutes(subRoutes, isPrivate, true)}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default HandleRoutes;
