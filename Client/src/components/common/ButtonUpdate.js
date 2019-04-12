import React from "react";
import CustomButton from "./CustomButton";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const ButtonUpdate = props => (
  <CustomButton
    color="info"
    icon={faSync}
    {...props} // handleAction, size
  />
);

export default ButtonUpdate;
