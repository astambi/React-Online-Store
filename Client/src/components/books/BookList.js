import React, { Fragment } from "react";
import BookCard from "./BookCard";
import Pagination from "../common/Pagination";

const BookList = props => {
  const { books, ...paginationProps } = props;

  return (
    <Fragment>
      <section className="books-list d-flex flex-wrap justify-content-start mt-3">
        {!books || books.length === 0 ? (
          <h3>No books found</h3>
        ) : (
          books.map(book => <BookCard key={book._id} book={book} />)
        )}
      </section>

      <Pagination
        {...paginationProps} // currentPage, totalPages, handlePage-/+
      />
    </Fragment>
  );
};

export default BookList;
