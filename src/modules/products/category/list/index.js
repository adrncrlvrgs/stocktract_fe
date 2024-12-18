import React from "react";

import CategoryTable from "./CategoryTable";
import PaginationComponent from "components/Pagination/PaginationComponent";
import { useSearch } from "components/SearchBar";
import CategoryHeader from "./CategoryHeader";
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
      <CategoryHeader
        search={search}
        handleSearchInputChange={handleSearchInputChange}
        // toggleCreate={toggleCreate}
      />
      <CategoryTable
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
