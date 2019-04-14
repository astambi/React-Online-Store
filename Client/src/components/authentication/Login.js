import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { UserConsumer } from "../contexts/user-context";
import authenticationService from "../../services/authentication-service";
import notificationService from "../../services/notification-service";
import { handleBlur, handleInputChange } from "../../services/helpers";
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
      },
      touched: {
        email: false,
        password: false
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

    await this.tryLoginUser();
  };

  tryLoginUser = async () => {
    try {
      const { user } = this.state;
      const response = await authenticationService.loginUser(user);
      console.log(response);

      const { success, message, errors, token, user: resUser } = response;

      if (!success) {
        this.setState({
          error: { message, errors }
        });

        // Error Notification
        notificationService.errorMsg(message);
      } else {
        // Save token to storage
        window.localStorage.setItem(auth.authToken, token);

        // Update UserContext state
        const { updateUser } = this.props;
        const userToUpdate = { ...resUser, isLoggedIn: true, cart: [] }; // { username, roles }
        updateUser(userToUpdate);

        // Update Login state
        this.setState({ error: {} });

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

    if (!user.password || user.password.trim().length === 0) {
      isValid = false;
      errors.password = notifications.passwordRequired;
    }

    const validationError = { message: isValid ? null : "", errors };
    this.setState({ error: validationError });
  }

  render() {
    const { isLoggedIn } = this.props; // UserContext

    if (isLoggedIn) {
      return <Redirect to={paths.indexPath} />;
    }

    return (
      <LoginForm
        {...this.state} // user, error
        handleBlur={this.handleBlur}
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
