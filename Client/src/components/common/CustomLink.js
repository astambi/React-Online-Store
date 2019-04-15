import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomLink = props => {
  const {
    entity,
    name,
    path,
    className,
    color = "primary",
    outline = true,
    size = "",
    icon
  } = props;

  if (!entity) {
    // return null;
  }

  return (
    <Link
      className={`btn 
      btn-${outline ? "outline-" : ""}${color}
      ${size ? `btn-${size}` : ""} 
      ${className || ""}
      text-capitalize`}
      to={`${path}${entity ? `/${entity._id}` : ""}`}
    >
      {!icon ? null : <FontAwesomeIcon icon={icon} />} {name}
    </Link>
  );
};

export default CustomLink;
