import React from "react";
import { useAuth } from "context/AuthContext";
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
  const { user } = useAuth();
  const { search, handleSearchInputChange } = useSearch();
  const { sales, meta, isLoading, refetch } = useGetSales();
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditSale(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteSale(refetch);
  return (
    <div className="">
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} placeholder="Search Sale by name and Id.." />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <SalesTable
        sales={sales}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
        auth={user}
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
