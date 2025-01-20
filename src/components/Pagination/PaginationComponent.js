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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; 
    const ellipsis = "...";

    if (totalPages <= maxVisiblePages) {

      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const rightBound = Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2));

      if (leftBound > 1) {
        pages.push(1);
        if (leftBound > 2) {
          pages.push(ellipsis);
        }
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages) {
        if (rightBound < totalPages - 1) {
          pages.push(ellipsis);
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

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

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={index} disabled>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem active={page === currentPage} key={index}>
              <PaginationLink onClick={() => handlePageChange(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

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