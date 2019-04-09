import React from "react";
import CustomLink from "../../common/buttons/CustomLink";
import { paths } from "../../../constants/constants";

const BookLinkDelete = props => (
  <CustomLink
    name={paths.bookDeleteName}
    path={paths.bookDeletePath}
    color="danger"
    {...props} // entity=book, size
  />
);

export default BookLinkDelete;
