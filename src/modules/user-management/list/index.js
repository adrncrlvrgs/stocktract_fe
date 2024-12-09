import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateUser from "./useCreateUser";
import useGetUsers from "./useGetUsers";
import useEditUser from "./useEditUser";
import useDeleteUser from "./useDeleteUser";

import UsersTable from "./UsersTable";
import UserAddEditModal from "./UserAddEditModal";
import UserCreate from "./UserCreateAction";
import UserDeleteModal from "./UserDeleteModal";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "components/Pagination";
import PaginationComponent from "components/Pagination/PaginationComponent";

function Index() {
  const { users, meta, isLoading, refetch } = useGetUsers();
  const { onCreate, isCreating, isCreateOpen, toggleCreate } =
    useCreateUser(refetch);
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditUser(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteUser(refetch);

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
      <UsersTable
        users={users}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />
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
      <UserDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        toggleDelete={toggleDelete}
        onDelete={onDelete}
      />
      <div className="mt-5">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}

export default Index;
