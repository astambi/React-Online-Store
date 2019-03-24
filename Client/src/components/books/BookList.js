import React from "react";
import BookCard from "./BookCard";

const BookList = props => {
  const { books } = props;

  if (!books || books.length === 0) {
    return <h3>No books found</h3>;
  }

  return (
    <div className="row">
      <div className="card-deck space-top">
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
