import React from "react";
import CustomButton from "./CustomButton";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ButtonUnlike = props => (
  <CustomButton
    name="Unlike"
    color="primary"
    icon={faThumbsDown}
    {...props} // handleAction, size
  />
);

export default ButtonUnlike;
