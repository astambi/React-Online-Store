import React from "react";
import CustomButton from "./CustomButton";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const ButtonDecrease = props => (
  <CustomButton
    color="primary"
    icon={faMinus}
    {...props} // handleAction, size
  />
);

export default ButtonDecrease;
