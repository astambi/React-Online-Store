import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = props => {
  const {
    name,
    color,
    size,
    icon,
    iconRight,
    handleAction,
    outline = true
  } = props;

  return (
    <button
      className={`btn 
      btn-${outline ? "outline-" : ""}${color}
      ${size ? `btn-${size}` : ""} 
      text-capitalize`}
      type="button"
      onClick={handleAction}
    >
      {!icon ? null : <FontAwesomeIcon icon={icon} />} {name}{" "}
      {!iconRight ? null : <FontAwesomeIcon icon={iconRight} />}
    </button>
  );
};

export default CustomButton;
