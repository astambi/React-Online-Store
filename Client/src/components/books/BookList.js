import React from "react";
import BookCard from "./BookCard";
import withLoading from "../hocs/withLoading";

const BookList = props => {
  const { books } = props;

  return (
    <section className="books-list d-flex flex-wrap justify-content-start mt-2">
      {!books || books.length === 0 ? (
        <h3>No books found</h3>
      ) : (
        books.map(book => <BookCard key={book._id} book={book} />)
      )}
    </section>
  );
};

// export default BookList;
export default withLoading(BookList);
