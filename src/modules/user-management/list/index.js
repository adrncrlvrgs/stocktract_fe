import React from "react";

import useCreateUser from "./useCreateUser";
import useEditUser from "./useEditUser";

import UsersTable from "./UsersTable";
import useGetUsers from "./useGetUsers";
import { ToastContainer } from "react-toastify";
import UserAddEditModal from "./UserAddEditModal";
import UserCreate from "./UserCreateAction";


function Index() {
  const { users, meta, isLoading, refetch } = useGetUsers();
  const { onCreate, isCreating, isCreateOpen, toggleCreate } =
    useCreateUser(refetch);
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditUser(refetch);

  return (
    <div className="p-6">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      /> */}
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <UserCreate toggle={toggleCreate} />
      <UsersTable users={users} isLoading={isLoading} toggleEdit={toggleEdit} />
      <UserAddEditModal
        isOpen={isCreateOpen}
        toggle={toggleCreate}
        onSubmit={onCreate}
      />
      <UserAddEditModal
        data={data}
        isOpen={isEditOpen}
        isFetching={isFetching}
        toggle={toggleEdit}
        onSubmit={onEdit}
      />
    </div>
  );
}

export default Index;
