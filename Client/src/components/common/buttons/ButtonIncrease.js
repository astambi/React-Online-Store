import React from "react";
import Button from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ButtonIncrease = props => (
  <Button
    color="success"
    icon={faPlus}
    {...props} // handleAction, size
  />
);

export default ButtonIncrease;
