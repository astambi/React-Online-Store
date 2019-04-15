import React, { Fragment } from "react";
import LinkDelete from "../../common/LinkDelete";
import LinkEdit from "../../common/LinkEdit";
import { paths } from "../../../constants/constants";

const BookAdminLinks = props => {
  const { book } = props;
  const size = "";

  return !book ? null : (
    <Fragment>
      <LinkEdit
        className="mt-1 mb-1"
        name={paths.bookEditName}
        path={paths.bookEditPath + "/" + book._id}
        size={size}
      />
      <LinkDelete
        className="mt-1 mb-1"
        name={paths.bookDeleteName}
        path={paths.bookDeletePath + "/" + book._id}
        size={size}
      />
    </Fragment>
  );
};

export default BookAdminLinks;
