import React from "react";

export default function PageHeader() {
  return (
    <header className="bg-blue-600 text-white shadow-md w-full">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="text-lg font-semibold">StocksTract</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
