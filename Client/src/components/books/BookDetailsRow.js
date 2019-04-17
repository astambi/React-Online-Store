import React from "react";

const BookDetailsRow = props => {
  const { title, value } = props;

  return (
    <div className="book-details-line">
      <span className="book-details-title">{title}: </span>
      {value}
    </div>
  );
};

export default BookDetailsRow;
