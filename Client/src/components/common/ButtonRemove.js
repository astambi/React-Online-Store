import React from "react";
import CustomButton from "./CustomButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ButtonRemove = props => (
  <CustomButton
    color="danger"
    icon={faTrash}
    {...props} // handleAction, size
  />
);

export default ButtonRemove;
