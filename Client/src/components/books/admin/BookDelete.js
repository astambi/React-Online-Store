import React from "react";
import BookAdmin from "./BookAdmin";
import { actions } from "../../../constants/constants";

const BookDelete = props => {
  const { id } = props.computedMatch.params; // NB

  return <BookAdmin action={actions.delete} id={id} />;
};

export default BookDelete;
