import React from "react";
import CustomButton from "./CustomButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ButtonIncrease = props => (
  <CustomButton
    color="primary"
    icon={faPlus}
    {...props} // handleAction, size
  />
);

export default ButtonIncrease;
