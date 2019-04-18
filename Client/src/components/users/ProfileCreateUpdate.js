import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import authenticationService from "../../services/authentication-service";
import notificationService from "../../services/notification-service";
import userService from "../../services/user-service";
import { handleBlur, handleInputChange } from "../../services/helpers";
import { notifications, paths } from "../../constants/constants";

class ProfileCreateUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistered: false,
      isUpdated: false,
      isDeleted: false,
      color: "",
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

  componentDidMount = async () => {
    const { action } = this.props;

    switch (action) {
      case "register":
        this.loadRegisterForm();
        break;
      case "edit":
        await this.loadEditForm();
        break;
      case "delete":
        await this.loadDeleteForm();
        break;
      default:
        break;
    }
  };

  loadRegisterForm = () => this.setState({ color: "success" });

  loadDeleteForm = async () => {
    // TODO
    const profile = await userService.getCurrentUserProfile();

    const { email, username } = profile;
    const currentUser = {
      email,
      username,
      password: "",
      confirmPassword: ""
    };

    this.setState({
      user: currentUser,
      color: "danger"
    });
  };

  loadEditForm = async () => {
    // Current user profile
    const profile = await userService.getCurrentUserProfile();

    const { email, username } = profile;
    const currentUser = {
      email,
      username,
      password: "",
      confirmPassword: ""
    };

    this.setState({
      user: currentUser,
      color: "warning"
    });
  };

  handleBlur = field => handleBlur.bind(this)(field, "touched");

  handleChange = event => {
    handleInputChange.bind(this)(event, "user");
    this.validateInput();
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { action } = this.props;
    switch (action) {
      case "register":
        await this.tryRegisterUser();
        break;
      case "edit":
        await this.tryEditUser();
        break;
      case "delete":
        this.tryDeleteUser();
        break;
      default:
        break;
    }
  };

  tryDeleteUser = async () => {
    // TODO
    const result = await userService.deleteCurrentUser();
    console.log(result);
    const { success, message, errors } = result;

    if (!success) {
      notificationService.errorMsg(message);
      this.setState({
        error: { message, errors }
      });
    } else {
      notificationService.successMsg(message);
      this.setState({ isDeleted: true, error: {} });
    }
  };

  tryEditUser = async () => {
    const { user } = this.state;
    // const { email, username, password } = user;
    // const userData = { email, username, password };

    const result = await userService.updateCurrentUser(user);
    console.log(result);
    const { success, message, errors } = result;

    if (!success) {
      notificationService.errorMsg(message);
      this.setState({
        error: { message, errors }
      });
    } else {
      notificationService.successMsg(message);
      this.setState({ isUpdated: true, error: {} });
    }
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
    const { action } = this.props;
    const { isRegistered, isUpdated, isDeleted, ...otherProps } = this.state;

    if (isRegistered) {
      return <Redirect to={paths.loginPath} />;
    }

    if (isUpdated) {
      return <Redirect to={paths.profilePath} />;
    }

    // Clear user data in storage
    if (isDeleted) {
      return <Redirect to={paths.logoutPath} />;
    }

    return (
      <ProfileForm
        {...otherProps} // user, error, color
        action={action}
        disabled={action === "delete"}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} // custom
      />
    );
  }
}

export default ProfileCreateUpdate;
