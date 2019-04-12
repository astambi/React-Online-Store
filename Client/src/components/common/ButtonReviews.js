import React from "react";
import CustomButton from "./CustomButton";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const ButtonReviews = props => (
  <CustomButton
    name="Reviews"
    color="primary"
    icon={faComments}
    {...props} // handleAction, size
  />
);

export default ButtonReviews;
