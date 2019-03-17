import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { UserConsumer } from "../contexts/user-context";
import authenticationService from "../../services/authentication-service";
import { auth, notifications, paths } from "../../constants/constants";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      error: {
        message: "",
        errors: {} // { email, password }
      }
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;

    user[name] = value;
    this.setState({ user });

    console.log(this.state.user);
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Input Validation
    if (!this.isValidInput()) {
      return;
    }

    // Clear errors
    this.setState({ error: {} });

    // Login user
    await this.tryLoginUser();
  };

  isValidInput() {
    const { user } = this.state;

    let isValid = true;
    const errors = {};

    if (!user.email) {
      isValid = false;
      errors.email = notifications.emailRequired;
    }

    if (!user.password) {
      isValid = false;
      errors.password = notifications.passwordRequired;
    }

    if (!isValid) {
      const message = notifications.credentialsRequired;
      const validationError = { message, errors };

      this.setState({ error: validationError });
    }

    return isValid;
  }

  async tryLoginUser() {
    try {
      const { user } = this.state;

      const response = await authenticationService.loginUser(user);
      console.log(response);
      const { success, message, errors, token, user: authUser } = response;

      if (!success) {
        this.setState({
          error: { message, errors }
        });
      } else {
        // Save to storage
        window.localStorage.setItem(auth.authToken, token);
        window.localStorage.setItem(auth.authUser, JSON.stringify(authUser));

        // Update UserContext state
        const { updateUser } = this.props;
        updateUser({
          isLoggedIn: true,
          ...authUser // { roles, username }
        });

        // Update Login state
        this.setState({ error: {} });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  }

  render() {
    const { isLoggedIn } = this.props; // UserContext

    if (isLoggedIn) {
      return <Redirect to={paths.indexPath} />;
    }

    return (
      <LoginForm
        {...this.state} // user, error
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

// UserContext
const LoginWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <Login {...props} isLoggedIn={user.isLoggedIn} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default Login;
export default LoginWithContext; // UserContext
