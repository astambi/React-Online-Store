import React from "react";
import Button from "./Button";

const ButtonSmall = props => (
  <Button
    size="sm"
    {...props} // handleAction, size
  />
);

export default ButtonSmall;
