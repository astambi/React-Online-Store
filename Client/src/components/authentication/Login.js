import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Error from "../common/Error";
import authenticationService from "../../services/authentication-service";
import { auth, notifications, paths } from "../../constants/constants";

class Login extends Component {
  // static authService = new AuthenticationService(); // static

  constructor(props) {
    super(props);

    // this.authService = new AuthenticationService();

    this.state = {
      user: {
        email: "",
        password: ""
      },
      isLoggedIn: false,
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

    console.log(this.state);

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
      // const response = await Login.authService.loginUser(user);
      // const response = await this.authService.loginUser(user);
      console.log(response);

      const { success, message, errors, token, user: authUser } = response;

      if (!success) {
        // const errorValues = Object.values(errors).join(" ");
        const error = { message, errors };
        this.setState({ error });
      } else {
        // Save token
        window.localStorage.setItem(auth.authToken, token);
        window.localStorage.setItem(auth.authUser, authUser.username);

        this.setState({
          isLoggedIn: true,
          error: {}
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  };

  isValidInput() {
    const { user } = this.state;

    if (!user.email || !user.password) {
      const message = notifications.credentialsRequired;
      const errors = {};

      if (!user.email) {
        errors.email = notifications.emailRequired;
      }

      if (!user.password) {
        errors.password = notifications.passwordRequired;
      }

      const validationError = { message, errors };
      this.setState({ error: validationError });
      return false;
    }

    return true;
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to={paths.index} />;
    }

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

export default Login;
