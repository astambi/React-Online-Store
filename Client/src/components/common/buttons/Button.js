import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = props => {
  const { name, color, size, icon, handleAction, outline = true } = props;

  return (
    <button
      className={`text-capitalize btn btn-${size} btn${
        outline ? "-outline" : ""
      }-${color}`}
      type="button"
      onClick={handleAction}
    >
      <FontAwesomeIcon icon={icon} /> {name}
    </button>
  );
};

export default Button;
