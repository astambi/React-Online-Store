import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = props => {
  const {
    type = "button",
    name,
    className,
    color = "success",
    outline = true,
    size,
    icon,
    iconRight,
    handleAction
  } = props;

  return (
    <button
      className={`btn 
      btn-${outline ? "outline-" : ""}${color}
      ${size ? `btn-${size}` : ""} 
      ${className}
      text-capitalize`}
      type={type}
      onClick={handleAction}
    >
      {!icon ? null : <FontAwesomeIcon icon={icon} />} {name}{" "}
      {!iconRight ? null : <FontAwesomeIcon icon={iconRight} />}
    </button>
  );
};

export default CustomButton;
