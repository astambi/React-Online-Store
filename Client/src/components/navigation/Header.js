import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import HeaderAll from "./HeaderAll";
import HeaderAnonymous from "./HeaderAnonymous";
import HeaderAuth from "./HeaderAuth";
import { UserConsumer } from "../contexts/user-context";
import { paths, roles } from "../../constants/constants";

class Header extends Component {
  render() {
    const { isLoggedIn, isAdmin, username } = this.props;
    const profileName = `${username}'s ${paths.profileName}`;

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justtify-content-between">
          <NavLink
            to={paths.indexPath}
            className="navbar-brand text-capitalize"
          >
            {paths.indexName}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse row ml-3" id="navbarColor01">
            <ul className="navbar-nav col justify-content-around">
              <HeaderAll />

              {isLoggedIn ? (
                isAdmin ? (
                  <HeaderAdmin />
                ) : (
                  <HeaderAuth profileName={profileName} />
                )
              ) : (
                <HeaderAnonymous />
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const HeaderWithContext = props => (
  <UserConsumer>
    {({ user }) => (
      <Header
        {...props}
        isLoggedIn={user.isLoggedIn}
        isAdmin={user.roles.includes(roles.adminRole)}
        username={user.username}
      />
    )}
  </UserConsumer>
);

// export default Header;
export default HeaderWithContext;
