import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import BookAdminLinks from "./admin/BookAdminLinks";
import BookDetailsView from "./BookDetailsView";
import BookUserLinks from "./BookUserLinks";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import ReviewsList from "../reviews/ReviewsList";
import bookService from "../../services/book-service";
import notificationService from "../../services/notification-service";
import { handleInputChange } from "../../services/helpers";
import { paths, notificationMessages } from "../../constants/constants";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginRequired: false,
      isOrdered: false,
      notFound: false,
      showReviews: false,
      book: null,
      review: {
        content: ""
      },
      error: ""
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;

    if (!id) {
      return;
    }

    if (!(await bookService.existsBookById(id))) {
      notificationService.errorMsg(notificationMessages.bookNotFoundMsg);
      this.setState({ notFound: true });
      return;
    }

    const book = await bookService.getBookById(id);
    this.setState({ book });
  };

  bookExists = async () => {
    const { book } = this.state;

    if (!book) {
      return false;
    }

    const exists = await bookService.existsBookById(book._id);
    return exists;
  };

  getReviewsCount = () => {
    const { book } = this.state;
    return book.reviews && book.reviews.length ? book.reviews.length : 0;
  };

  handleChange = event => handleInputChange.bind(this)(event, "review");

  handleLike = async () => {
    if (!(await this.isAuthWithNotification())) {
      return;
    }

    const { book } = this.state;
    const { _id } = book;

    const result = await bookService.likeBookById(_id);
    this.updateBook(result);
  };

  handleUnlike = async () => {
    if (!(await this.isAuthWithNotification())) {
      return;
    }

    const { book } = this.state;
    const { _id } = book;

    const result = await bookService.unlikeBookById(_id);
    this.updateBook(result);
  };

  handleOrderBook = async () => {
    if (!(await this.isAuthWithNotification())) {
      return;
    }

    const { orderBook } = this.props;
    const { book } = this.state;

    orderBook(book);
    this.setState({ isOrdered: true });
  };

  handleReviewsVisibility = () =>
    this.setState(prevState => ({ showReviews: !prevState.showReviews }));

  handleReviewDelete = async reviewIndex => {
    if (!(await this.isAuthWithNotification())) {
      return;
    }

    // Admin or Author Delete review
    const { book } = this.state;
    const result = await bookService.deleteBookReviewByIdIndex(
      book._id,
      reviewIndex
    );
    this.updateBook(result);
  };

  handleSubmitReview = async event => {
    event.preventDefault();

    if (!(await this.isAuthWithNotification())) {
      return;
    }

    const { book, review } = this.state;

    const result = await bookService.reviewBookById(book._id, {
      review: review.content.trim()
    });
    this.updateBook(result);
  };

  isAuthWithNotification = async () => {
    if (this.props.isLoginRequired()) {
      this.setState({ isLoginRequired: true });
      return false;
    }

    if (!(await this.bookExists())) {
      notificationService.errorMsg(notificationMessages.bookNotFoundMsg);
      this.setState({ notFound: true });
      return false;
    }

    return true;
  };

  isBookLiked = () => {
    const { book } = this.state;
    const { user } = this.props;

    if (!book || !book.likes || book.likes.length === 0 || !user) {
      return false;
    }

    return book.likes.some(u => u === user.username);
  };

  isBookReviewed = () => {
    const { book } = this.state;
    const { user } = this.props;

    if (!book || !book.reviews || book.reviews.length === 0 || !user) {
      return false;
    }

    return book.reviews.some(r => r.createdBy === user.username);
  };

  isValidInput = review => {
    if (!review) {
      return false;
    }

    const { content } = review;
    if (!content || content.trim() === "") {
      return false;
    }

    return true;
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

  render() {
    const {
      notFound,
      isLoginRequired,
      isOrdered,
      showReviews,
      book,
      ...otherProps
    } = this.state;

    if (notFound) {
      return <Redirect to={paths.storePath} />;
    }

    if (isLoginRequired) {
      return <Redirect to={paths.loginPath} />;
    }

    if (isOrdered) {
      return <Redirect to={paths.cartPath} />;
    }

    if (!book) {
      return null;
    }

    const { isAdmin, user } = this.props;
    const reviewsCount = this.getReviewsCount();

    return (
      <Fragment>
        <BookDetailsView book={book} />

        <section className="book-actions-container row justify-content-end mt-2">
          <section className="book-actions-visible-container col-lg-9 pt-2 pb-2">
            <section className="user-actions mt-3 mb-3 row row-wrap justify-content-around">
              <BookUserLinks
                isLiked={this.isBookLiked()} // display liked button css if book is liked
                isReviewed={this.isBookReviewed()} // display reviews button css if book is reviewed
                handleLike={this.handleLike}
                handleUnlike={this.handleUnlike}
                handleReviewsVisibility={this.handleReviewsVisibility}
                handleOrderBook={this.handleOrderBook}
                reviewsCount={reviewsCount}
              />

              {isAdmin() ? <BookAdminLinks book={book} /> : null}
            </section>

            {!showReviews ? null : (
              <Fragment>
                <section className="book-review-create-form mt-3 mb-3">
                  <ReviewCreateForm
                    {...otherProps} // review, error
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmitReview}
                  />
                </section>

                <section className="book-reviews-list mt-3 mb-3">
                  <ReviewsList
                    reviews={book.reviews}
                    handleReviewDelete={this.handleReviewDelete}
                    username={user.username} // review author
                    isAdmin={isAdmin()}
                  />
                </section>
              </Fragment>
            )}
          </section>
        </section>
      </Fragment>
    );
  }
}

const BookDetailsWithContext = props => (
  <UserConsumer>
    {({ isAdmin, isLoginRequired, orderBook, user }) => (
      <BookDetails
        {...props}
        isAdmin={isAdmin}
        isLoginRequired={isLoginRequired}
        orderBook={orderBook}
        user={user}
      />
    )}
  </UserConsumer>
);

// export default BookDetails;
export default BookDetailsWithContext;
