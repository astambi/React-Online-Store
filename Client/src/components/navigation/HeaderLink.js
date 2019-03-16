import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLink = props => {
  const { to, name } = props;
  const navLinkName = name || to.slice(1); // path name
  const navLinkStyle = "text-capitalize";

  return to && navLinkName ? (
    <NavLink
      to={to}
      className={navLinkStyle}
      activeClassName="active"
      aria-current="page"
    >
      {navLinkName}
    </NavLink>
  ) : null;
};

export default HeaderLink;
