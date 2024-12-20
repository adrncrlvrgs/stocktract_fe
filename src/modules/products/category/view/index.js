import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateCategory from "../hooks/useCreateCategory";
import useGetCategories from "../hooks/useGetCategories";
import useEditCategory from "../hooks/useEditCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";

import CategoryTable from "./CategoryTable";
import CategoryAddEditModal from "./CategoryAddEditModal";
import CategoryDeleteModal from "./CategoryDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import CategoryHeader from "./CategoryHeader";
function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { categories, meta, isLoading, refetch } = useGetCategories();
  const { onCreate, isCreating, isCreateOpen, toggleCreate } =
    useCreateCategory(refetch);
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditCategory(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteCategory(refetch);
  return (
    <div className="p-6">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      /> */}
      <CategoryHeader
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        toggleCreate={toggleCreate}
      />
      <CategoryTable
        categories={categories}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />
      <CategoryAddEditModal
        isOpen={isCreateOpen}
        toggle={toggleCreate}
        onSubmit={onCreate}
        isLoading={isCreating}
      />
      <CategoryAddEditModal
        data={data}
        isOpen={isEditOpen}
        isFetching={isFetching}
        isLoading={isEditing}
        toggle={toggleEdit}
        onSubmit={onEdit}
      />
      <CategoryDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        toggleDelete={toggleDelete}
        isLoading={isDeleting}
        onDelete={onDelete}
      />
      
      <div className="mt-5">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}

export default Index;
