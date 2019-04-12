import React from "react";
import CustomButton from "./CustomButton";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ButtonOrder = props => (
  <CustomButton
    name="Order"
    color="success"
    icon={faShoppingCart}
    {...props} // handleAction, size
  />
);

export default ButtonOrder;
