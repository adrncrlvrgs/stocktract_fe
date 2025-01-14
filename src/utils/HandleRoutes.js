import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { Page } from "components/Pages";
import NotFound from "views/not-found";

const ProtectedRoute = ({
  access,
  isAuth,
  redirectPath,
  requiredRole,
  children,
}) => {
  const { user } = useAuth();

  if (access === "private" && !isAuth) {
    return <Navigate to={redirectPath} />;
  }

  if (access === "public" && isAuth) {
    return <Navigate to="/dashboard" />;
  }

  if (
    access === "private" &&
    requiredRole &&
    !requiredRole.includes(user?.userData?.role)
  ) {
    return <Navigate to="/unauthorized" />;
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
      const {
        path,
        component: Component,
        access,
        subRoutes,
        requiredRole,
      } = route;

      const isPrivate = access === "private" || isParentPrivate;

      return (
        <Route
          key={index}
          path={path}
          element={
            <ProtectedRoute
              access={access}
              isAuth={isAuth}
              redirectPath="/"
              requiredRole={requiredRole}
            >
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

  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HandleRoutes;
