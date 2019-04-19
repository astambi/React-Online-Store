import React from "react";
import BookAdmin from "./BookAdmin";
import { actions } from "../../../constants/constants";

const BookEdit = props => {
  const { id } = props.computedMatch.params; // NB

  return <BookAdmin action={actions.edit} id={id} />;
};
export default BookEdit;
