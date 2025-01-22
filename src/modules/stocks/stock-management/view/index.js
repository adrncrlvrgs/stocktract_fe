import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateStock from "../hooks/useCreateStock";
import useGetStocks from "../hooks/useGetStocks";
import useEditStock from "../hooks/useEditStock";
import useDeleteStock from "../hooks/useDeleteStock";

import StocksTable from "./StocksTable";
import StockAddEditModal from "./StockAddEditModal";
import StockDeleteModal from "./StockDeleteModal";

import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import StockHeader from "./StockHeader";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { stocks, meta, isLoading, refetch } = useGetStocks();
  const { onCreate, isCreating, isCreateOpen, toggleCreate } =
    useCreateStock(refetch);
  const { data, onEdit, isFetching, isEditing, isEditOpen, toggleEdit } =
    useEditStock(refetch);
  const { id, onDelete, isDeleting, isDeleteOpen, toggleDelete } =
    useDeleteStock(refetch);

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />

      <StockHeader
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        toggleCreate={toggleCreate}
      />

      <StocksTable
        stocks={stocks}
        isLoading={isLoading}
        toggleEdit={toggleEdit}
        toggleDelete={toggleDelete}
      />
      <StockAddEditModal
        isOpen={isCreateOpen}
        toggle={toggleCreate}
        onSubmit={onCreate}
        isLoading={isCreating}
      />
      <StockAddEditModal
        data={data}
        isOpen={isEditOpen}
        isFetching={isFetching}
        isLoading={isEditing}
        toggle={toggleEdit}
        onSubmit={onEdit}
      />
      <StockDeleteModal
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
