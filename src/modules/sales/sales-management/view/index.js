import React from "react";
import { ToastContainer } from "react-toastify";

import useGetSales from "../hooks/useGetSales";
import useEditSale from "../hooks/useEditSale";
import useDeleteSale from "../hooks/useDeleteSale";

import SalesTable from "./SalesTable";
import SaleEditModal from "./SaleEditModal";
import SaleDeleteModal from "./SaleDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch, InputSearch } from "components/SearchBar";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { sales, meta, isLoading, refetch } = useGetSales();
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditSale(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteSale(refetch);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
      </div>
      <SalesTable
        sales={sales}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />
      <SaleEditModal
        data={data}
        isOpen={isEditOpen}
        isFetching={isFetching}
        isLoading={isEditing}
        toggle={toggleEdit}
        onSubmit={onEdit}
      />
      <SaleDeleteModal
        id={id}
        isOpen={isDeleteOpen}
        toggleDelete={toggleDelete}
        isLoading={isDeleting}
        onDelete={onDelete}
      />
      <PaginationComponent meta={meta} />
    </div>
  );
}

export default Index;
