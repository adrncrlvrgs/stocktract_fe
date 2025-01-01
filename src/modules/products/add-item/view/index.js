import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateItem from "../hooks/useCreateItem";
import useGetStocks from "modules/stocks/stock-management/hooks/useGetStocks";

import StocksTable from "./StocksTable";
import CreateItemModal from "./CreateItemModal";
import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch, InputSearch } from "components/SearchBar";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const {
    data,
    onCreate,
    isFetching,
    isCreating,
    isCreatingOpen,
    toggleCreate,
  } = useCreateItem();
  const { stocks, meta, isLoading } = useGetStocks();

  return (
    <div className="">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
      /> */}
      {/* <ItemHeader
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        toggleCreate={toggleCreate}
      /> */}
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
      </div>
      <StocksTable
        stocks={stocks}
        isLoading={isLoading}
        toggleCreate={toggleCreate}
      />
      <CreateItemModal
        data={data}
        isOpen={isCreatingOpen}
        isFetching={isFetching}
        isLoading={isCreating}
        toggle={toggleCreate}
        onSubmit={onCreate}
      />

      <div className="mt-5">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}

export default Index;