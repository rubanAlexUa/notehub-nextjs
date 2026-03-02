import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  handleChangePage: (selected: number) => void;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  handleChangePage,
  totalPages,
}: PaginationProps) {
  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }: { selected: number }) =>
          handleChangePage(selected)
        }
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
}
