import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import HandleRoutes from "utils/HandleRoutes";
import { routes } from "routes";
import { AuthProvider } from "context/AuthContext";
import { NavItemsProvider } from "context/NavContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavItemsProvider>
          <HandleRoutes routes={routes} />
        </NavItemsProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
