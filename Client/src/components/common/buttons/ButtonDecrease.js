import React from "react";
import Button from "./Button";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const ButtonDecrease = props => (
  <Button
    color="warning"
    icon={faMinus}
    {...props} // handleAction, size
  />
);

export default ButtonDecrease;
