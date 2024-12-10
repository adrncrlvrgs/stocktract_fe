import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "./Pagination";
import { Input } from "components/Input";
import usePagination from "./usePagination";

const PaginationComponent = (props) => {
  const { meta } = props;
  const { totalPages } = meta;

  const {
    page: currentPage,
    limit: itemsPerPage,
    handlePageChange,
    handleLimitChange,
  } = usePagination();
  const limitOptions = [10, 20, 50];

  return (
    <div className="flex justify-between items-center py-2 px-5">
      <div className="flex items-center">
        <span className="mr-2 font-medium">Items per page:</span>
        <Input
          type="select"
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          defaultValue={itemsPerPage}
          className="w-20"
        >
          {limitOptions.map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </Input>
      </div>

      <Pagination aria-label="Page navigation" className="flex space-x-2">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink first onClick={() => handlePageChange(1)} />
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            previous
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem active={i + 1 === currentPage} key={i}>
            <PaginationLink onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink
            next
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink
            last
            onClick={() => handlePageChange(totalPages)}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
