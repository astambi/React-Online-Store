import React from "react";
import { Link } from "react-router-dom";

const CustomLink = props => {
  const { entity, name, path, color, size, outline = true } = props;

  if (!entity) {
    return null;
  }

  return (
    <Link
      className={`text-capitalize btn btn-${size} btn${
        outline ? "-outline" : ""
      }-${color}`}
      to={`${path}/${entity._id}`}
    >
      {name}
    </Link>
  );
};

export default CustomLink;
