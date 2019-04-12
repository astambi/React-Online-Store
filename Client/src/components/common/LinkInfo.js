import React from "react";
import CustomLink from "./CustomLink";

const LinkContinue = props => (
  <CustomLink
    color="primary"
    {...props} // entity=book, size
  />
);

export default LinkContinue;
