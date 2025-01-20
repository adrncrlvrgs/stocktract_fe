import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateCategory from "modules/products/category/hooks/useCreateCategory";
import useGetCategories from "modules/products/category/hooks/useGetCategories";
import useEditCategory from "modules/products/category/hooks/useEditCategory";
import useDeleteCategory from "modules/products/category/hooks/useDeleteCategory";

import CategoryTable from "modules/products/category/view/CategoryTable";
import CategoryAddEditModal from "modules/products/category/view/CategoryAddEditModal";
import CategoryDeleteModal from "modules/products/category/view/CategoryDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import CategoryHeader from "modules/products/category/view/CategoryHeader";

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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
      />
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
