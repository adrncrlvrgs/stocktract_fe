import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateItem from "../hooks/useCreateItem";
import useGetItems from "../hooks/useGetItems";
import useEditItem from "../hooks/useEditItem";
import useDeleteItem from "../hooks/useDeleteItem";

import ItemsTable from "./ItemsTable";
import ItemAddEditModal from "./ItemAddEditModal";
import ItemDeleteModal from "./ItemDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import ItemHeader from "./ItemHeader";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { items, meta, isLoading, refetch } = useGetItems();
  const { onCreate, isCreating, isCreateOpen, toggleCreate } =
    useCreateItem(refetch);
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditItem(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteItem(refetch);

  return (
    <div className="p-6">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      /> */}
      <ItemHeader
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        toggleCreate={toggleCreate}
      />
      <ItemsTable
        items={items}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />
      <ItemAddEditModal
        isOpen={isCreateOpen}
        toggle={toggleCreate}
        onSubmit={onCreate}
        isLoading={isCreating}
      />
      <ItemAddEditModal
        data={data}
        isOpen={isEditOpen}
        isFetching={isFetching}
        isLoading={isEditing}
        toggle={toggleEdit}
        onSubmit={onEdit}
      />
      <ItemDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        toggleDelete={toggleDelete}
        isLoading={isDeleting}
        onDelete={onDelete}
      />
      <PaginationComponent meta={meta} refetch={refetch} />
    </div>
  );
}

export default Index;