import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import { paths } from "../../constants/constants";

class AuthorizedRoute extends Component {
  isAuthorized = () => {
    const { isLoggedIn, userRoles, allowedRoles } = this.props;

    if (!isLoggedIn) {
      return false;
    }

    // No role requirements
    if (allowedRoles.length === 0) {
      return true;
    }

    return userRoles.some(role => allowedRoles.includes(role));
  };

  render() {
    const {
      isLoggedIn,
      userRoles,
      allowedRoles,
      component: ComponentFromRoute, //
      ...otherProps
    } = this.props;

    if (!this.isAuthorized()) {
      return <Redirect to={paths.loginPath} />;
    }

    return <ComponentFromRoute {...otherProps} />; //
  }
}

const AuthorizedRouteWithContext = props => (
  <UserConsumer>
    {({ user }) => (
      <AuthorizedRoute
        {...props}
        allowedRoles={props.allowedRoles}
        component={props.component} //
        isLoggedIn={user.isLoggedIn}
        userRoles={user.roles}
      />
    )}
  </UserConsumer>
);

// export default AuthorizedRoute;
export default AuthorizedRouteWithContext;
