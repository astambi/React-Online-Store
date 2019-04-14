import React from "react";
import BookAdmin from "./BookAdmin";

const BookDelete = props => {
  const { id } = props.computedMatch.params; // NB

  return <BookAdmin action="delete" id={id} />;
};

export default BookDelete;
