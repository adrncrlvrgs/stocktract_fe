import React from "react";
import { Outlet, Link } from "react-router-dom";

const TablesLayout = () => {
  return (
    <div>
      <nav>
        <ul className="tabs">
          <li><Link to="/tables/a">Table A</Link></li>
          <li><Link to="/tables/b">Table B</Link></li>
        </ul>
      </nav>
      <div>
        <Outlet /> {/* Renders the active child route */}
      </div>
    </div>
  );
};

export default TablesLayout;