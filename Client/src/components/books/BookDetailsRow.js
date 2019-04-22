import React from "react";

const BookDetailsRow = props => {
  const { title, value, children } = props;

  return (
    <div className="book-details-line">
      <span className="book-details-title">{title}: </span>
      {children} {value}
    </div>
  );
};

export default BookDetailsRow;
