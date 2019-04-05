import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../constants/constants";

const BookActionsAdmin = props => {
  const { bookId } = props;

  if (!bookId) {
    return null;
  }

  return (
    <Fragment>
      <Link
        to={`${paths.bookEditPath}/${bookId}`}
        className="btn btn-lg btn-outline-warning"
      >
        {paths.bookEditName}
      </Link>
      <Link
        to={`${paths.bookDeletePath}/${bookId}`}
        className="btn btn-lg btn-outline-danger"
      >
        {paths.bookDeleteName}
      </Link>
    </Fragment>
  );
};

export default BookActionsAdmin;
