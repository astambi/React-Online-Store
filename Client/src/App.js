import React, { Component } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import { UserProvider, defaultUser } from "./components/contexts/user-context"; // UserContext

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: defaultUser // UserContext
    };
  }

  updateUser = user => this.setState({ user }); // UserContext

  render() {
    const { user } = this.state; // UserContext

    // Clear Storage
    if (!user.isLoggedIn) {
      window.localStorage.clear();
    }

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
