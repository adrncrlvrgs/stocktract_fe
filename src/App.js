import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import HandleRoutes from "utils/HandleRoutes";
import { routes } from "routes";
import { AuthProvider } from "context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <HandleRoutes routes={routes} />
      </AuthProvider>
    </Router>
  );
};

export default App;
