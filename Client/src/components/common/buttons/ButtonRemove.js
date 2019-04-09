import React from "react";
import Button from "./Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ButtonRemove = props => (
  <Button
    color="danger"
    icon={faTrash}
    {...props} // handleAction, size
  />
);

export default ButtonRemove;
