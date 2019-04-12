import React from "react";
import CustomLink from "./CustomLink";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const LinkEdit = props => (
  <CustomLink
    name="Edit"
    color="warning"
    icon={faPen}
    {...props} // entity=book, size
  />
);

export default LinkEdit;
