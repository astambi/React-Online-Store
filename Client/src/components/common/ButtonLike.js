import React from "react";
import CustomButton from "./CustomButton";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const ButtonLike = props => (
  <CustomButton
    name="Like"
    color="primary"
    icon={faThumbsUp}
    {...props} // handleAction, size
  />
);

export default ButtonLike;
