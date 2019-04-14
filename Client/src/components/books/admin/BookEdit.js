import React from "react";
import BookAdmin from "./BookAdmin";

const BookEdit = props => {
  const { id } = props.computedMatch.params; // NB

  return <BookAdmin action="edit" id={id} />;
};
export default BookEdit;
