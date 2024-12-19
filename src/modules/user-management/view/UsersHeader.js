import React from "react";
import { InputSearch } from "components/SearchBar";
import UserCreateAction from "./UserCreateAction";

const UsersHeader = ({ search, handleSearchInputChange, toggleCreate }) => {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-semibold mb-1">User Management</h1>
      <p className="text-gray-500 text-sm mb-4">
        Manage the users of the system, create new users, or search existing
        users.
      </p>

      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
        <UserCreateAction toggle={toggleCreate} />
      </div>
    </div>
  );
};

export default UsersHeader;
