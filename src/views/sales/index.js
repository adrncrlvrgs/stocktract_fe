import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

function Index() {
  const location = useLocation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Sales</h1>
      <p className="text-gray-500 text-sm mb-4">Manage your Sales here</p>
      <nav className="mb-6">
        <ul className="flex border-b">
          <li
            className={`mr-1 ${
              location.pathname === "/sales/sales-management"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            <Link
              to="/sales/sales-management"
              className={`inline-block py-2 px-4 ${
                location.pathname === "/sales/sales-management"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Sale Management
            </Link>
          </li>
          <li
            className={`mr-1 ${
              location.pathname === "/sales/addSale"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            <Link
              to="/sales/addSale"
              className={`inline-block py-2 px-4 ${
                location.pathname === "/sales/addSale"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Add Sale
            </Link>
          </li>
          <li
            className={`mr-1 ${
              location.pathname === "/sales/stats"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
          >
            <Link
              to="/sales/stats"
              className={`inline-block py-2 px-4 ${
                location.pathname === "/sales/stats"
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              Sale Stats
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
