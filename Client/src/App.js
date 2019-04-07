import React, { Component } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import NotificationsContainer from "./components/notifications/NotificationsContainer";
import { UserProvider, defaultUser } from "./components/contexts/user-context"; // UserContext
import { auth } from "./constants/constants";

class App extends Component {
  constructor(props) {
    super(props);

    const user = this.tryLoadUserFromStorage();

    this.state = { user };
  }

  tryLoadUserFromStorage = () => {
    const authToken = window.localStorage.getItem(auth.authToken);
    const authUser = JSON.parse(window.localStorage.getItem(auth.authUser));

    if (!authToken || !authUser) {
      return defaultUser;
    }

    const userFromStorage = { ...authUser, isLoggedIn: true };
    return userFromStorage;
  };

  updateUser = user => {
    window.localStorage.setItem(auth.authUser, JSON.stringify(user));
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    console.log(user);

    return (
      <div className="App">
        <NotificationsContainer />

        <UserProvider
          // UserContext
          value={{
            user,
            updateUser: this.updateUser
          }}
        >
          <Header />
          <AppRouter />
          <Footer />
        </UserProvider>
      </div>
    );
  }
}

export default App;
