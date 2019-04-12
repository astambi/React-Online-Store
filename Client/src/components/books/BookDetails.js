import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import BookAdmin from "./BookAdmin";
import BookDetailsView from "./BookDetailsView";
import ButtonLike from "../common/ButtonLike";
import ButtonOrder from "../common/ButtonOrder";
import ButtonReviews from "../common/ButtonReviews";
import ButtonUnlike from "../common/ButtonUnlike";
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
      <Fragment>
        <BookDetailsView
          book={book}
          actions={
            <Fragment>
              <ButtonLike handleAction={this.handleLike} />
              <ButtonUnlike handleAction={this.handleUnlike} />
              <ButtonReviews
                handleAction={this.handleReviewsVisibility}
                name={`Reviews (${reviewsCount})`}
              />
              <ButtonOrder handleAction={this.handleOrderBook} />
            </Fragment>
          }
        />

        {!showReviews ? null : (
          <section className="book-reviews-container row justify-content-end">
            <section className="book-review-create-form col-lg-9 mb-3">
              <ReviewCreateForm
                {...otherProps} // review, error
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmitReview}
              />
            </section>

            <section className="book-reviews-list col-lg-9 mb-3">
              <ReviewsList
                reviews={book.reviews}
                handleReviewDelete={this.handleReviewDelete}
                isAdmin={isAdmin()}
              />
            </section>
          </section>
        )}

        {!isAdmin() ? null : (
          <section className="book-admin row justify-content-end">
            <article className="col-lg-9 row justify-content-around">
              <BookAdmin book={book} />
            </article>
          </section>
        )}
      </Fragment>
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
