import React from "react";
import CustomLink from "../../common/buttons/CustomLink";
import { paths } from "../../../constants/constants";

const BookLinkDetails = props => (
  <CustomLink
    name={paths.bookDetailsName}
    path={paths.bookDetailsPath}
    color="primary"
    {...props} // entity=book, size
  />
);

export default BookLinkDetails;
