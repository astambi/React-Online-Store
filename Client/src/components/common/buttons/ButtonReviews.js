import React from "react";
import Button from "./Button";
import { faComments } from "@fortawesome/free-solid-svg-icons";

const ButtonReviews = props => (
  <Button
    name="Reviews"
    color="info"
    icon={faComments}
    {...props} // handleAction, size
  />
);

export default ButtonReviews;
