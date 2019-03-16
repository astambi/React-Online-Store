import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Error from "../../components/common/Error";
import authenticationService from "../../services/authentication-service";
// import notifications from "../../constants/notification-constants";
// import paths from "../../constants/path-constants";
import { notifications, paths } from "../../constants/constants";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      isRegistered: false,
      error: {
        message: "",
        errors: {}
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

    // Validation
    if (!this.isValidInput()) {
      return;
    }

    // Clear errors
    this.setState({ error: {} });

    // Save in db
    try {
      const { user } = this.state;
      const response = await authenticationService.registerUser(user);
      console.log(response);

      const { success, message, errors } = response;

      if (!success) {
        this.setState({
          error: {
            message,
            errors
          }
        });
      } else {
        this.setState({
          isRegistered: true,
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

    let isValid = true;
    const errors = {};

    if (!user.email) {
      isValid = false;
      errors.email = notifications.emailRequired;
    }

    if (!user.username) {
      isValid = false;
      errors.username = notifications.usernameRequired;
    }

    if (!user.password) {
      isValid = false;
      errors.password = notifications.passwordRequired;
    }

    if (!user.confirmPassword) {
      isValid = false;
      errors.confirmPassword = notifications.passwordRequired;
    }

    if (user.confirmPassword && user.password !== user.confirmPassword) {
      isValid = false;
      errors.confirmPassword = notifications.passwordsDoNotMatch;
    }

    if (!isValid) {
      const message = notifications.credentialsRequired;
      const validationError = { message, errors };

      this.setState({ error: validationError });
    }

    return isValid;
  }

  render() {
    console.log(this.state);

    if (this.state.isRegistered) {
      return <Redirect to={paths.loginPath} />;
    }

    const { user, error } = this.state;
    const { email, username, password, confirmPassword } = user;
    const { message, errors } = error;

    return (
      <div className="form-wrapper">
        <h1>Register</h1>

        <form onSubmit={this.handleSubmit}>
          {// Error notification
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
            {// Error notification
            errors && errors.email ? (
              <Error notification={errors.email} />
            ) : null}
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              // required
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={this.handleChange}
            />
            {// Error notification
            errors && errors.username ? (
              <Error notification={errors.username} />
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
            {// Error notification
            errors && errors.password ? (
              <Error notification={errors.password} />
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              // required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={this.handleChange}
            />
            {// Error notification
            errors && errors.confirmPassword ? (
              <Error notification={errors.confirmPassword} />
            ) : null}
          </div>

          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default Register;
