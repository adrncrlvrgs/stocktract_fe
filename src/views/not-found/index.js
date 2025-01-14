import React from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <p className="text-2xl mb-8 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow hover:scale-105 active:scale-95"
        onClick={() => navigate(-1)}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default Index;
