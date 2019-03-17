import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Error from "../common/Error";
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
    try {
      const { user } = this.state;
      const response = await authenticationService.loginUser(user);
      console.log(response);

      const { success, message, errors, token, user: authUser } = response;

      if (!success) {
        const error = { message, errors };
        this.setState({ error });
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

  render() {
    const { isLoggedIn } = this.props; // UserContext

    // Redirect
    if (isLoggedIn) {
      return <Redirect to={paths.indexPath} />;
    }

    // Render Login Form
    const { user, error } = this.state;
    const { email, password } = user;
    const { message, errors } = error;

    return (
      <div className="form-wrapper">
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {// Error Notification
          message ? <Error notification={message} /> : null}

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              // required
              type="email"
              name="email"
              id="email"
              placeholder="Enter e-mail"
              value={email}
              onChange={this.handleChange}
            />
            {// Error Notification
            errors && errors.email ? (
              <Error notification={errors.email} />
            ) : null}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              // required
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={this.handleChange}
            />
            {// Error Notification
            errors && errors.password ? (
              <Error notification={errors.password} />
            ) : null}
          </div>

          <input type="submit" value="Login" />
        </form>
      </div>
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
