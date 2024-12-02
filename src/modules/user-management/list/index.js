import React from "react";
import UsersTable from "./UsersTable";
import useGetUsers from "./useGetUsers";

function index() {
  const { users, isloading, refetch } = useGetUsers();
  console.log(users); 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <UsersTable users={users} isloading={isloading} />
    </div>
  );
}

export default index;
