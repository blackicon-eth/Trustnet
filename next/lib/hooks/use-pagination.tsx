import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn-ui/pagination";

export const usePagination = (data: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      if (currentPage > 2) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
          </PaginationItem>
        );
        if (currentPage > 3) {
          items.push(<PaginationEllipsis key="start-ellipsis" />);
        }
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          items.push(<PaginationEllipsis key="end-ellipsis" />);
        }
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  const Pager = () => {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return {
    currentData,
    currentPage,
    totalPages,
    handlePageChange,
    Pager,
  };
};
