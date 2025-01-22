import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import useGetItems from "../hooks/useGetItems";
import useEditItem from "../hooks/useEditItem";
import useDeleteItem from "../hooks/useDeleteItem";

import ItemsTable from "./ItemsTable";
import ItemEditModal from "./ItemEditModal";
import ItemDeleteModal from "./ItemDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import ItemHeader from "./ItemHeader";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { items, meta, isLoading, refetch } = useGetItems();
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditItem(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteItem(refetch);

  const [viewMode, setViewMode] = useState("table");

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "grid" : "table");
  };

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      <ItemHeader
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        search={search}
        handleSearchInputChange={handleSearchInputChange}
      />
      <ItemsTable
        viewMode={viewMode}
        items={items}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />

      <ItemEditModal
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
