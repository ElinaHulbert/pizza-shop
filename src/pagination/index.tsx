import React from "react";
import styles from "./pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
}

export default Pagination;
