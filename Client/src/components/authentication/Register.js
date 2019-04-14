import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import authenticationService from "../../services/authentication-service";
import notificationService from "../../services/notification-service";
import { handleBlur, handleInputChange } from "../../services/helpers";
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
      },
      touched: {
        email: false,
        username: false,
        password: false,
        confirmPassword: false
      }
    };
  }

  handleBlur = field => handleBlur.bind(this)(field, "touched");

  handleChange = event => {
    handleInputChange.bind(this)(event, "user");
    this.validateInput();
  };

  handleSubmit = async event => {
    event.preventDefault();

    await this.tryRegisterUser();
  };

  tryRegisterUser = async () => {
    try {
      const { user } = this.state;

      const response = await authenticationService.registerUser(user);
      console.log(response);
      const { success, message, errors } = response;

      if (!success) {
        this.setState({
          error: { message, errors }
        });

        // Error Notification
        notificationService.errorMsg(message);
      } else {
        this.setState({
          isRegistered: true,
          error: {}
        });

        // Success Notification
        notificationService.successMsg(message);
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });

      // Error Notification
      notificationService.errorMsg(error);
    }
  };

  validateInput() {
    const { user } = this.state;

    let isValid = true;
    const errors = {};

    if (!user.email || user.email.trim().length === 0) {
      isValid = false;
      errors.email = notifications.emailRequired;
    }

    if (!user.username || user.username.trim().length < 4) {
      isValid = false;
      errors.username = notifications.usernameRequired;
    }

    if (!user.password || user.password.trim().length < 8) {
      isValid = false;
      errors.password = notifications.passwordRequired;
    }

    if (!user.confirmPassword || user.confirmPassword.trim().length < 8) {
      isValid = false;
      errors.confirmPassword = notifications.passwordRequired;
    }

    if (user.confirmPassword && user.password !== user.confirmPassword) {
      isValid = false;
      errors.confirmPassword = notifications.passwordsDoNotMatch;
    }

    const validationError = { message: isValid ? null : "", errors };
    this.setState({ error: validationError });
  }

  render() {
    const { isRegistered, ...otherProps } = this.state;

    if (isRegistered) {
      return <Redirect to={paths.loginPath} />;
    }

    return (
      <RegisterForm
        {...otherProps} // user, error
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Register;
