import React, { Component } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import { UserProvider, defaultUser } from "./components/contexts/user-context"; // UserContext
import { auth } from "./constants/constants";

class App extends Component {
  constructor(props) {
    super(props);

    const user = this.tryLoadUserFromStorage();

    this.state = { user };
  }

  tryLoadUserFromStorage = () => {
    const authUser = JSON.parse(window.localStorage.getItem(auth.authUser));
    return authUser
      ? {
          isLoggedIn: true,
          ...authUser // { roles, username, cart }
        }
      : defaultUser;
  };

  updateUser = user => this.setState({ user });

  render() {
    const { user } = this.state;
    console.log(user);

    return (
      <div className="App">
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
