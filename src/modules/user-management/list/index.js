import React from "react";

import useCreateUser from "./useCreateUser";

import UsersTable from "./UsersTable";
import useGetUsers from "./useGetUsers";
import { ToastContainer } from "react-toastify";
import UserAddEditModal from "./UserAddEditModal";
import UserCreate from "./UserCreateAction"

function Index() {
  const { users, isLoading, refetch } = useGetUsers();
  const {onCreate,isCreating,isCreateOpen, toggleCreate} = useCreateUser(refetch)

  return (
    <div className="p-6">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      /> */}
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <UserCreate toggle={toggleCreate}/>
      <UserAddEditModal isOpen={isCreateOpen} toggle={toggleCreate} onSubmit={onCreate}/>
      <UsersTable users={users} isLoading={isLoading} />
    </div>
  );
}

export default Index;
