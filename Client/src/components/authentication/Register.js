import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import authenticationService from "../../services/authentication-service";
import { handleInputChange } from "../../services/helpers";
import { notifications, paths } from "../../constants/constants";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistered: false,
      user: {
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      error: {
        message: "",
        errors: {}
      }
    };
  }

  handleChange = event => handleInputChange.bind(this)(event, "user");

  handleSubmit = async event => {
    event.preventDefault();

    // Input Validation
    if (!this.isValidInput()) {
      return;
    }

    // Clear errors
    this.setState({ error: {} });

    // Register
    await this.tryRegisterUser();
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

  async tryRegisterUser() {
    try {
      const { user } = this.state;

      const response = await authenticationService.registerUser(user);
      console.log(response);
      const { success, message, errors } = response;

      if (!success) {
        this.setState({
          error: { message, errors }
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
  }

  render() {
    const { isRegistered, ...otherProps } = this.state;

    if (isRegistered) {
      return <Redirect to={paths.loginPath} />;
    }

    return (
      <RegisterForm
        {...otherProps} // user, error
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Register;
