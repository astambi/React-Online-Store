import React from "react";
import { Redirect } from "react-router-dom";
import BookActionsAdmin from "./BookActionsAdmin";
import BookActionsUser from "./BookActionsUser";
import BookDetailsView from "./BookDetailsView";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import ReviewsList from "../reviews/ReviewsList";
import { UserConsumer } from "../contexts/user-context";
import bookService from "../../services/book-service";
import notificationService from "../../services/notification-service";
import { handleInputChange } from "../../services/helpers";
import { paths, roles, notificationMessages } from "../../constants/constants";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginRequired: false,
      isOrdered: false,
      showReviews: false,
      book: null,
      review: {
        content: ""
      },
      error: ""
    };
  }

  componentDidMount() {
    const { state } = this.props.location; // from Link
    if (state === undefined || !state || !state.book) {
      return;
    }

    const { book } = this.props.location.state;
    this.setState({ book });
  }

  addBookToCart = (book, cart) => {
    const { _id, title, image, genres, price } = book;
    cart.push({ _id, title, image, genres, price, quantity: 1 });
  };

  getReviewsCount = () => {
    const { book } = this.state;
    return book.reviews && book.reviews.length ? book.reviews.length : 0;
  };

  handleChange = event => handleInputChange.bind(this)(event, "review");

  handleLike = async () => {
    if (!this.isAuthenticated()) {
      return;
    }

    const { book } = this.state;
    const { _id } = book;

    const result = await bookService.likeBookById(_id);
    this.updateBook(result);
  };

  handleUnlike = async () => {
    if (!this.isAuthenticated()) {
      return;
    }

    const { book } = this.state;
    const { _id } = book;

    const result = await bookService.unlikeBookById(_id);
    this.updateBook(result);
  };

  handleOrderBook = () => {
    if (!this.isAuthenticated()) {
      return;
    }

    const { user, updateUser } = this.props;
    const { book } = this.state;
    let cart = user.cart.slice();

    // Add book to cart
    const bookInCart = cart.find(b => b._id === book._id);
    if (bookInCart === null || bookInCart === undefined) {
      this.addBookToCart(book, cart);
    } else {
      this.updateBookQuantity(bookInCart);
    }

    // Update user cart
    const userToUpdate = { ...user, cart };
    updateUser(userToUpdate);

    // Update state
    this.setState({ isOrdered: true });

    // Success Notification
    notificationService.successMsg(notificationMessages.bookAddedToCartMsg);
  };

  handleReviewsVisibility = () =>
    this.setState(prevState => ({ showReviews: !prevState.showReviews }));

  handleSubmitReview = async event => {
    event.preventDefault();

    if (!this.isAuthenticated()) {
      return;
    }

    const { book, review } = this.state;

    const result = await bookService.reviewBookById(book._id, {
      review: review.content
    });
    this.updateBook(result);
  };

  isAdmin = () => {
    const { user } = this.props;

    return (
      user.roles &&
      user.roles.length > 0 &&
      user.roles.includes(roles.adminRole)
    );
  };

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

  updateBook = result => {
    console.log(result);
    const { success, message, data } = result;

    if (!success) {
      this.setState({ error: message });

      // Error Notification
      notificationService.errorMsg(message);
    } else {
      this.setState({
        book: data,
        review: { content: "" },
        error: ""
      });

      // Success Notification
      notificationService.successMsg(message);
    }
  };

  updateBookQuantity = bookInCart => (bookInCart.quantity += 1);

  render() {
    const { isLoginRequired } = this.state;

    if (isLoginRequired) {
      return <Redirect to={paths.loginPath} />;
    }

    const { isOrdered, book, showReviews, ...otherProps } = this.state;

    if (isOrdered) {
      return <Redirect to={paths.cartPath} />;
    }

    if (!book) {
      return (
        <div className="container">
          <h1>Book does not exist</h1>
        </div>
      );
    }

    const isAdmin = this.isAdmin();
    const reviewsCount = this.getReviewsCount();

    return (
      <div className="container">
        <BookDetailsView book={book}>
          <BookActionsUser
            reviewsCount={reviewsCount}
            handleLike={this.handleLike}
            handleUnlike={this.handleUnlike}
            handleOrderBook={this.handleOrderBook}
            handleReviewsVisibility={this.handleReviewsVisibility}
          />
        </BookDetailsView>

        <section className="row justify-content-end">
          {showReviews ? (
            <article className="col-lg-9">
              <ReviewCreateForm
                {...otherProps} // review, error
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmitReview}
              />

              <ReviewsList reviews={book.reviews} />
            </article>
          ) : null}

          {isAdmin ? (
            <article className="d-flex justify-content-around col-lg-9 p-2">
              <BookActionsAdmin book={book} />
            </article>
          ) : null}
        </section>
      </div>
    );
  }
}

const BookDetailsWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <BookDetails {...props} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default BookDetails;
export default BookDetailsWithContext;
