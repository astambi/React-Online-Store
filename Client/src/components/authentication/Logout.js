import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer, defaultUser } from "../contexts/user-context";
import { paths, auth } from "../../constants/constants";

class Logout extends Component {
  componentWillUnmount() {
    // Clear Storage
    window.localStorage.removeItem(auth.authToken);
    window.localStorage.removeItem(auth.authUser);

    // Reset UserContext
    const { updateUser } = this.props;
    updateUser(defaultUser);
  }

  render() {
    return <Redirect to={paths.indexPath} />;
  }
}

const LogoutWithContext = props => (
  <UserConsumer>
    {({ updateUser }) => <Logout {...props} updateUser={updateUser} />}
  </UserConsumer>
);

// export default Logout;
export default LogoutWithContext;
