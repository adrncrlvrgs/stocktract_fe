import React from "react";
import { ToastContainer } from "react-toastify";

import useCreateSale from "../hooks/useCreateSale";
import useGetItems from "modules/products/items/hooks/useGetItems";

import ItemsTable from "./ItemsTable";
import CreateSaleModal from "./CreateSaleModal";
import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch, InputSearch } from "components/SearchBar";

function Index() {
  const { search, handleSearchInputChange } = useSearch();
  const { items, meta, isLoading, refetch } = useGetItems();
  const {
    data,
    onCreate,
    isFetching,
    isCreating,
    isCreatingOpen,
    toggleCreate,
  } = useCreateSale(refetch);

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} placeholder="Search Item by name and Id.." />
        </div>
      </div>
      <ItemsTable
        items={items}
        isLoading={isLoading}
        toggleCreate={toggleCreate}
      />
      <CreateSaleModal
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
