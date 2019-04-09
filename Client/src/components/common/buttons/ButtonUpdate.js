import React from "react";
import Button from "./Button";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const ButtonUpdate = props => (
  <Button
    color="info"
    icon={faSync}
    {...props} // handleAction, size
  />
);

export default ButtonUpdate;
