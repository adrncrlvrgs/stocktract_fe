import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "context/AuthContext";
import HandleRoutes from "utils/HandleRoutes";
import { routes } from "routes";

const App = () => {
  return (
    // <AuthProvider>
      <Router>
        <HandleRoutes routes={routes} />
      </Router>
    // </AuthProvider>
  );
};

export default App;
