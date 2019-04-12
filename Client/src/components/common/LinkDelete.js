import React from "react";
import CustomLink from "./CustomLink";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const LinkDelete = props => (
  <CustomLink
    name="Delete"
    color="danger"
    icon={faTrash}
    {...props} // entity=book, size
  />
);

export default LinkDelete;
