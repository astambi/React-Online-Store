import React from "react";
import CustomLink from "./CustomLink";

const LinkDelete = props => (
  <CustomLink
    name="Details"
    color="info"
    {...props} // entity=book, size
  />
);

export default LinkDelete;
