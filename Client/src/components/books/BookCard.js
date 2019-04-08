import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import BookCardView from "./BookCardView";
import { UserConsumer } from "../contexts/user-context";
import bookService from "../../services/book-service";
import notificationService from "../../services/notification-service";
import { paths, notificationMessages } from "../../constants/constants";

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginRequired: false,
      isOrdered: false
    };
  }

  handleOrderBook = async () => {
    const { book, isLoginRequired, orderBook } = this.props;

    if (isLoginRequired()) {
      this.setState({ isLoginRequired: true });
      return;
    }

    if (!book || !(await bookService.existsBookById(book._id))) {
      notificationService.errorMsg(notificationMessages.bookNotFoundMsg);
      return;
    }

    orderBook(book);
    this.setState({ isOrdered: true });
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

    if (!book) {
      return null;
    }

    return (
      <BookCardView book={book}>
        <Link
          to={`${paths.bookDetailsPath}/${book._id}`}
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
    {({ isLoginRequired, orderBook }) => (
      <BookCard
        {...props}
        isLoginRequired={isLoginRequired}
        orderBook={orderBook}
      />
    )}
  </UserConsumer>
);

// export default BookCard;
export default BookCardWithContext;
