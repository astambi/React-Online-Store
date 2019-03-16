import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer, defaultUser } from "../contexts/user-context";
import { paths } from "../../constants/constants";

class Logout extends Component {
  componentDidMount() {
    // Clear Token
    window.localStorage.clear();

    // Reset UserContext
    const { updateUser } = this.props;
    updateUser({ ...defaultUser });
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
