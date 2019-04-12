import React from "react";
import CustomButton from "./CustomButton";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ButtonCheckout = props => (
  <CustomButton
    name="Checkout"
    color="success"
    iconRight={faAngleRight}
    outline={false}
    {...props} // handleAction, size
  />
);

export default ButtonCheckout;
