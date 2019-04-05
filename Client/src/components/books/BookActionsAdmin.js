import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../constants/constants";

const BookActionsAdmin = props => {
  const { book } = props;

  if (!book) {
    return null;
  }

  return (
    <Fragment>
      <Link
        to={{
          pathname: `${paths.bookEditPath}/${book._id}`,
          state: { book }
        }}
        className="btn btn-lg btn-outline-warning"
      >
        {paths.bookEditName}
      </Link>
      <Link
        to={{
          pathname: `${paths.bookDeletePath}/${book._id}`,
          state: { book }
        }}
        className="btn btn-lg btn-outline-danger"
      >
        {paths.bookDeleteName}
      </Link>
    </Fragment>
  );
};

export default BookActionsAdmin;
