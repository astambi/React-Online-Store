import React, { Fragment } from "react";
import BookDetailsView from "./BookDetailsView";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import ReviewsList from "../reviews/ReviewsList";
import bookService from "../../services/book-service";
import { handleInputChange } from "../../services/helpers";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    console.log(state);
    const { book } = this.props.location.state;
    this.setState({ book });
  }

  handleChange = event => handleInputChange.bind(this)(event, "review");

  handleLike = async () => {
    const { book } = this.state;
    const { _id } = book;
    const result = await bookService.likeBookById(_id);
    this.updateBook(result);
  };

  handleUnlike = async () => {
    const { book } = this.state;
    const { _id } = book;
    const result = await bookService.unlikeBookById(_id);
    this.updateBook(result);
  };

  handleSubmitReview = async event => {
    event.preventDefault();

    const { book, review } = this.state;

    const result = await bookService.reviewBookById(book._id, {
      review: review.content
    });
    this.updateBook(result);
  };

  handleOrderBook = () => {
    console.log("TODO Order book");
  };

  handleReviewsVisibility = () => {
    this.setState(prevState => ({
      showReviews: !prevState.showReviews
    }));
  };

  updateBook = result => {
    console.log(result);
    const { success, message, data } = result;

    if (!success) {
      this.setState({ error: message });
    } else {
      this.setState({
        book: data,
        review: { content: "" },
        error: ""
      });
    }
  };

  render() {
    const { book, showReviews, ...otherProps } = this.state;

    if (!book) {
      return (
        <div className="container">
          <h1>Book does not exist</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <BookDetailsView book={book}>
          <button
            className="btn btn-outline-primary book-details-btn"
            type="button"
            onClick={this.handleLike}
          >
            Like
          </button>
          <button
            className="btn btn-outline-danger book-details-btn"
            type="button"
            onClick={this.handleUnlike}
          >
            Unlike
          </button>
          <button
            className="btn btn-outline-info book-details-btn"
            type="button"
            onClick={this.handleReviewsVisibility}
          >
            Reviews
          </button>
          <button
            className="btn btn-outline-warning book-details-btn"
            type="button"
            onClick={this.handleOrderBook}
          >
            Order
          </button>
        </BookDetailsView>

        {showReviews ? (
          <section className="row justify-content-end">
            <section className="col-md-9">
              <ReviewCreateForm
                {...otherProps} // review, error
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmitReview}
              />
              <ReviewsList reviews={book.reviews} />
            </section>
          </section>
        ) : null}
      </div>
    );
  }
}

export default BookDetails;
