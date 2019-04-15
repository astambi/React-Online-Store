import React from "react";
import CustomLink from "./CustomLink";

const LinkInfo = props => (
  <CustomLink
    color="primary"
    {...props} // entity=book, size
  />
);

export default LinkInfo;
