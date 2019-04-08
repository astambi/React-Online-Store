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
import { paths, notificationMessages } from "../../constants/constants";

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

  getReviewsCount = () => {
    const { book } = this.state;
    return book.reviews && book.reviews.length ? book.reviews.length : 0;
  };

  handleChange = event => handleInputChange.bind(this)(event, "review");

  handleLike = async () => {
    if (this.props.isLoginRequired()) {
      this.setState({ isLoginRequired: true });
      return;
    }

    const { book } = this.state;
    const { _id } = book;

    const result = await bookService.likeBookById(_id);
    this.updateBook(result);
  };

  handleUnlike = async () => {
    if (this.props.isLoginRequired()) {
      this.setState({ isLoginRequired: true });
      return;
    }

    const { book } = this.state;
    const { _id } = book;

    const result = await bookService.unlikeBookById(_id);
    this.updateBook(result);
  };

  handleOrderBook = () => {
    if (this.props.isLoginRequired()) {
      this.setState({ isLoginRequired: true });
      return;
    }

    const { orderBook } = this.props;
    const { book } = this.state;

    orderBook(book);
    this.setState({ isOrdered: true });
  };

  handleReviewsVisibility = () =>
    this.setState(prevState => ({ showReviews: !prevState.showReviews }));

  handleSubmitReview = async event => {
    event.preventDefault();

    if (this.props.isLoginRequired()) {
      this.setState({ isLoginRequired: true });
      return;
    }

    const { book, review } = this.state;

    // Input Validation
    if (!this.isValidInput(review)) {
      notificationService.warningMsg(notificationMessages.invalidInput);
      return;
    }

    const result = await bookService.reviewBookById(book._id, {
      review: review.content.trim()
    });
    this.updateBook(result);
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
      isLoginRequired,
      isOrdered,
      showReviews,
      book,
      ...otherProps
    } = this.state;

    if (isLoginRequired) {
      return <Redirect to={paths.loginPath} />;
    }

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
