import React, { Component, Fragment } from "react";
import HeaderLink from "./HeaderLink";
import { UserConsumer } from "../contexts/user-context";
import { paths } from "../../constants/constants";

class Header extends Component {
  render() {
    const { isLoggedIn, username } = this.props; // UserContext
    const profileName = `${username}'s ${paths.profileName}`;

    return (
      <header>
        <nav className="navbar-menu">
          <HeaderLink to={paths.indexPath} name={paths.indexName} />
          <HeaderLink to={paths.homePath} name={paths.homeName} />
          <HeaderLink to={paths.storePath} name={paths.storeName} />

          {isLoggedIn ? (
            // Authenticated
            <Fragment>
              <HeaderLink to={paths.ordersPath} name={paths.ordersName} />
              <HeaderLink to={paths.cartPath} name={paths.cartName} />
              <HeaderLink to={paths.profilePath} name={profileName} />
              <HeaderLink to={paths.logoutPath} name={paths.logoutName} />
            </Fragment>
          ) : (
            // Anonymous
            <Fragment>
              <HeaderLink to={paths.loginPath} name={paths.loginName} />
              <HeaderLink to={paths.registerPath} name={paths.registerName} />
            </Fragment>
          )}
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
        username={user.username}
      />
    )}
  </UserConsumer>
);

// export default Header;
export default HeaderWithContext;
