import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";
function Index() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Products-item Management</h1>
      <p className="text-gray-500 text-sm mb-4">Manage your product items here</p>
      <nav className="mb-6">
        <ul className="flex border-b">
          <li
            className={`mr-1 ${
              location.pathname === "/products/items"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            <Link
              to="/products/items"
              className={`inline-block py-2 px-4 ${
                location.pathname === "/products/items"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Item-Management
            </Link>
          </li>

          {user?.role === "admin" && (
            <li
              className={`mr-1 ${
                location.pathname === "/products/addItem"
                  ? "border-b-2 border-blue-500"
                  : ""
              }`}
            >
              <Link
                to="/products/addItem"
                className={`inline-block py-2 px-4 ${
                  location.pathname === "/products/addItem"
                    ? "text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                Add Item
              </Link>
            </li>
          )}

          <li
            className={`mr-1 ${
              location.pathname === "/products/stats"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            <Link
              to="/products/stats"
              className={`inline-block py-2 px-4 ${
                location.pathname === "/products/stats"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Item Stats
            </Link>
          </li>
        </ul>
      </nav>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Index;
