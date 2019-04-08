import React, { Component } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import NotificationsContainer from "./components/notifications/NotificationsContainer";
import { UserProvider, defaultUser } from "./components/contexts/user-context"; // UserContext
import notificationService from "./services/notification-service";
import { auth, notificationMessages, roles } from "./constants/constants";

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

  isAdmin = () => {
    const { user } = this.state;

    return (
      user &&
      user.roles &&
      user.roles.length > 0 &&
      user.roles.includes(roles.adminRole)
    );
  };

  isLoginRequired = () => {
    const { user } = this.state;

    // Info Notification
    if (!user.isLoggedIn) {
      notificationService.infoMsg(notificationMessages.loginRequiredMsg);
      return true;
    }

    return false;
  };

  orderBook = book => {
    if (!this.state.user.isLoggedIn) {
      return;
    }

    // Add book to cart
    const { user } = this.state;
    let cart = user.cart.slice();
    let bookToOrder = cart.find(b => b._id === book._id);
    if (bookToOrder === null || bookToOrder === undefined) {
      const { _id, title, image, genres, price } = book;
      cart.push({ _id, title, image, genres, price, quantity: 1 });
    } else {
      bookToOrder.quantity += 1; // update only quantity
    }

    // Update user cart & user in storage
    const userToUpdate = { ...user, cart };
    this.updateUser(userToUpdate);

    // Success Notification
    notificationService.successMsg(notificationMessages.bookAddedToCartMsg);
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
            isAdmin: this.isAdmin,
            isLoginRequired: this.isLoginRequired,
            orderBook: this.orderBook,
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
