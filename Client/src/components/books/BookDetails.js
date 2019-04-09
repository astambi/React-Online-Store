import React from "react";
import { Redirect } from "react-router-dom";
import AdminBookActions from "./admin/AdminBookActions";
import BookActionsUser from "./BookActionsUser";
import BookDetailsView from "./BookDetailsView";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import ReviewsList from "../reviews/ReviewsList";
import { UserConsumer } from "../contexts/user-context";
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

    const { book } = this.state;

    let reviewsToUpdate = book.reviews.slice();
    reviewsToUpdate.splice(reviewIndex, 1);
    const bookToUpdate = {
      ...book,
      reviews: reviewsToUpdate
    };

    const result = await bookService.editBookById(book._id, bookToUpdate);
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

    const { isAdmin } = this.props;
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

              <ReviewsList
                reviews={book.reviews}
                handleReviewDelete={this.handleReviewDelete}
                isAdmin={isAdmin()}
              />
            </article>
          ) : null}

          {isAdmin() ? (
            <article className="d-flex justify-content-around col-lg-9 p-2">
              <AdminBookActions book={book} />
            </article>
          ) : null}
        </section>
      </div>
    );
  }
}

const BookDetailsWithContext = props => (
  <UserConsumer>
    {({ isAdmin, isLoginRequired, orderBook }) => (
      <BookDetails
        {...props}
        isAdmin={isAdmin}
        isLoginRequired={isLoginRequired}
        orderBook={orderBook}
      />
    )}
  </UserConsumer>
);

// export default BookDetails;
export default BookDetailsWithContext;
