import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateUser from "modules/user-management/hooks/useCreateUser";
import useGetUsers from "modules/user-management/hooks/useGetUsers";
import useEditUser from "modules/user-management/hooks/useEditUser";
import useDeleteUser from "modules/user-management/hooks/useDeleteUser";

import UsersTable from "modules/user-management/view/UsersTable";
import UserAddEditModal from "modules/user-management/view/UserAddEditModal";
import UserDeleteModal from "modules/user-management/view/UserDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import UsersHeader from "modules/user-management/view/UsersHeader";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { users, meta, isLoading, refetch } = useGetUsers();
  const { onCreate, isCreating, isCreateOpen, toggleCreate } =
    useCreateUser(refetch);
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditUser(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteUser(refetch);

  return (
    <div className="p-6">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      <UsersHeader
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        toggleCreate={toggleCreate}
      />

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
        isLoading={isCreating}
      />
      <UserAddEditModal
        data={data}
        isOpen={isEditOpen}
        isFetching={isFetching}
        isLoading={isEditing}
        toggle={toggleEdit}
        onSubmit={onEdit}
      />
      <UserDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        isLoading={isDeleting}
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
