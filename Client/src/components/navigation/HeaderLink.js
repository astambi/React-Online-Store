import React from "react";
import { NavLink } from "react-router-dom";

const HeaderLink = props => {
  const { to, name } = props;
  const navLinkName = name || to.slice(1); // path name

  return to && navLinkName ? (
    <li className="nav-item">
      <NavLink
        to={to}
        className="nav-link"
        activeClassName="active"
        aria-current="page"
      >
        {navLinkName}
      </NavLink>
    </li>
  ) : null;
};

export default HeaderLink;
