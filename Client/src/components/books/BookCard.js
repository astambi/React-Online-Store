import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookCardView from "./BookCardView";
import BookLinkDetails from "./buttons/BookLinkDetails";
import ButtonOrder from "../common/buttons/ButtonOrder";
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
        <BookLinkDetails entity={book} size="sm" />
        <ButtonOrder size="sm" handleAction={this.handleOrderBook} />
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
