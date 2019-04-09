import React from "react";
import Button from "./Button";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const ButtonLike = props => (
  <Button
    name="Like"
    color="primary"
    icon={faThumbsUp}
    {...props} // handleAction, size
  />
);

export default ButtonLike;
