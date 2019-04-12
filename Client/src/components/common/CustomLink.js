import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomLink = props => {
  const {
    entity,
    name,
    path,
    color = "primary",
    size = "",
    outline = true,
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
      text-capitalize`}
      to={`${path}${entity ? `/${entity._id}` : ""}`}
    >
      {!icon ? null : <FontAwesomeIcon icon={icon} />} {name}
    </Link>
  );
};

export default CustomLink;
