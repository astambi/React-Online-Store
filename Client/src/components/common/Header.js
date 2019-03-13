import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { paths, auth } from "../../constants/constants";

const Header = () => (
  <header>
    <nav className="navbar-menu">
      <NavLink to={paths.index} activeClassName="active" aria-current="page">
        Book Store
      </NavLink>
      <NavLink to={paths.home} activeClassName="active">
        Home
      </NavLink>
      <NavLink to={paths.store} activeClassName="active">
        Store
      </NavLink>

      {window.localStorage.getItem(auth.authToken) ? (
        // Authenticated
        <Fragment>
          <NavLink to={paths.orders} activeClassName="active">
            My Orders
          </NavLink>
          <NavLink to={paths.cart} activeClassName="active">
            Cart
          </NavLink>
          <NavLink to={paths.logout}>Logout</NavLink>
        </Fragment>
      ) : (
        // Anonymous
        <Fragment>
          <NavLink to={paths.login} activeClassName="active">
            Login
          </NavLink>
          <NavLink to={paths.register} activeClassName="active">
            Register
          </NavLink>
        </Fragment>
      )}
    </nav>
  </header>
);

export default Header;
