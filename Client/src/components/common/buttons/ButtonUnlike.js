import React from "react";
import Button from "./Button";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ButtonUnlike = props => (
  <Button
    name="Unlike"
    color="danger"
    icon={faThumbsDown}
    {...props} // handleAction, size
  />
);

export default ButtonUnlike;
