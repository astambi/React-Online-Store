import React from "react";
import Button from "./Button";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ButtonOrder = props => (
  <Button
    name="Order"
    color="warning"
    icon={faShoppingCart}
    {...props} // handleAction, size
  />
);

export default ButtonOrder;
