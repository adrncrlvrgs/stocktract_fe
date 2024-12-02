import React from "react";
import UsersTable from "./UsersTable";
import useGetUsers from "./useGetUsers";

function Index() {
  const { users, isLoading, refetch } = useGetUsers();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <UsersTable users={users} isLoading={isLoading} />
    </div>
  );
}

export default Index;
