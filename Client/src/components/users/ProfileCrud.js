import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import ProfileForm from "./ProfileForm";
import authenticationService from "../../services/authentication-service";
import notificationService from "../../services/notification-service";
import userService from "../../services/user-service";
import { handleBlur, handleInputChange } from "../../services/helpers";
import { actions, auth, notifications, paths } from "../../constants/constants";

class ProfileCrud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isRegistered: false,
      isDeleted: false,
      isUpdated: false,
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
      case actions.register:
        this.loadRegisterForm();
        break;
      case actions.login:
        this.loadLoginForm();
        break;
      case actions.edit:
        await this.loadEditForm();
        break;
      case actions.delete:
        await this.loadDeleteForm();
        break;
      default:
        break;
    }
  };

  loadLoginForm = () => this.setState({ color: "primary" });

  loadRegisterForm = () => this.setState({ color: "success" });

  loadDeleteForm = async () => {
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
      case actions.register:
        await this.tryRegisterUser();
        break;
      case actions.login:
        await this.tryLoginUser();
        break;
      case actions.edit:
        await this.tryEditUser();
        break;
      case actions.delete:
        this.tryDeleteUser();
        break;
      default:
        break;
    }
  };

  tryDeleteUser = async () => {
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

    const result = await userService.updateCurrentUser(user);
    console.log(result);
    const { success, message, errors, data } = result;

    if (!success) {
      notificationService.errorMsg(message);
      this.setState({ error: { message, errors } });
    } else {
      // Update UserContext state
      const { updateUser, user } = this.props; // from context
      const { username, roles } = data; // from server

      const userToUpdate = {
        ...user, // { cart, isLoggedIn } from context
        username, // from server
        roles // from server
      };
      updateUser(userToUpdate);

      notificationService.successMsg(message);
      this.setState({ isUpdated: true, error: {} });
    }
  };

  tryLoginUser = async () => {
    try {
      const { user } = this.state;
      const response = await authenticationService.loginUser(user);
      console.log(response);

      const { success, message, errors, token, user: resUser } = response;

      if (!success) {
        this.setState({ error: { message, errors } });

        // Error Notification
        notificationService.errorMsg(message);
      } else {
        // Save token to storage
        window.localStorage.setItem(auth.authToken, token);

        // Update UserContext state
        const { updateUser } = this.props;
        console.log(resUser); // username, roles

        const userToUpdate = {
          ...resUser, // username, roles
          isLoggedIn: true,
          cart: []
        };
        updateUser(userToUpdate);

        // Update Login state
        this.setState({ isLoggedIn: true, error: {} });

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

  tryRegisterUser = async () => {
    try {
      const { user } = this.state;

      const response = await authenticationService.registerUser(user);
      console.log(response);
      const { success, message, errors } = response;

      if (!success) {
        this.setState({ error: { message, errors } });

        // Error Notification
        notificationService.errorMsg(message);
      } else {
        this.setState({ isRegistered: true, error: {} });

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
    const {
      isLoggedIn,
      isRegistered,
      isUpdated,
      isDeleted,
      ...otherProps
    } = this.state;

    if (isLoggedIn) {
      return <Redirect to={paths.indexPath} />;
    }

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
        disabled={action === actions.delete}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} // custom
      />
    );
  }
}

// export default ProfileCrud;

const ProfileCrudWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <ProfileCrud {...props} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

export default ProfileCrudWithContext;
