import React from "react";

import ItemsTable from "./ItemsTable";
import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import ItemHeader from "./ItemHeader";
function Index() {
  const { search, handleSearchInputChange } = useSearch();
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
        // toggleCreate={toggleCreate}
      />
      <ItemsTable
        // users={users}
        // isLoading={isLoading}
        // toggleEdit={toggleEdit}
        // toggleDelete={toggleDelete}
      />
      {/* <div className="mt-5">
        <PaginationComponent meta={meta} />
      </div> */}
    </div>
  );
}

export default Index;
