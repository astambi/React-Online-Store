import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import BookCardView from "./BookCardView";
import { UserConsumer } from "../contexts/user-context";
import notificationService from "../../services/notification-service";
import { paths, notificationMessages } from "../../constants/constants";

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOrdered: false,
      isLoginRequired: false
    };
  }

  addBookToCart(book, cart) {
    const { _id, title, image, genres, price } = book;
    cart.push({ _id, title, image, genres, price, quantity: 1 });
  }

  isAuthenticated = () => {
    const { user } = this.props;
    const isUserAuthenticated = user.isLoggedIn;

    if (!isUserAuthenticated) {
      this.setState({ isLoginRequired: true });

      // Info Notification
      notificationService.infoMsg(notificationMessages.loginRequiredMsg);
    }

    return isUserAuthenticated;
  };

  updateBookQuantity = bookToOrder => (bookToOrder.quantity += 1);

  handleOrderBook = () => {
    // Check Authentication
    if (!this.isAuthenticated()) {
      return;
    }

    const { user, updateUser, book } = this.props;

    // Add book to cart
    let cart = user.cart.slice();
    let bookToOrder = cart.find(b => b._id === book._id);
    if (bookToOrder === null || bookToOrder === undefined) {
      this.addBookToCart(book, cart);
    } else {
      this.updateBookQuantity(bookToOrder);
    }

    // Update user cart
    const userToUpdate = { ...user, cart };
    updateUser(userToUpdate);

    this.setState({ isOrdered: true });

    // Success Notification
    notificationService.successMsg(notificationMessages.bookAddedToCartMsg);
  };

  render() {
    const { isLoginRequired, isOrdered } = this.state;

    if (isLoginRequired) {
      return <Redirect to={paths.loginPath} />;
    }

    if (isOrdered) {
      return <Redirect to={paths.cartPath} />;
    }

    const { book } = this.props;
    const { _id } = book;

    return (
      <BookCardView book={book}>
        <Link
          to={{
            pathname: `${paths.bookDetailsPath}/${_id}`,
            state: { book }
          }}
          type="button"
          className="btn btn-primary btn-sm"
        >
          {paths.bookDetailsName}
        </Link>
        <button
          type="button"
          className="btn btn-warning btn-sm"
          onClick={this.handleOrderBook}
        >
          Order
        </button>
      </BookCardView>
    );
  }
}

const BookCardWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <BookCard {...props} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default BookCard;
export default BookCardWithContext;
