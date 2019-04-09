import React from "react";
import CustomLink from "../../common/buttons/CustomLink";
import { paths } from "../../../constants/constants";

const BookLinkEdit = props => (
  <CustomLink
    name={paths.bookEditName}
    path={paths.bookEditPath}
    color="warning"
    {...props} // entity=book, size
  />
);

export default BookLinkEdit;
