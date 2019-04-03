import React from "react";
import BookDetailsView from "./BookDetailsView";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import bookService from "../../services/book-service";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null,
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

  updateBook = result => {
    console.log(result);
    const { success, message, data } = result;

    if (!success) {
      this.setState({ error: message });
    } else {
      this.setState({
        book: data,
        error: ""
      });
    }
  };

  handleOrder = () => {
    console.log("TODO Ordered book");
  };

  handleSubmitReview = event => {
    event.preventDefault();

    console.log("TODO Submitted review");
  };

  render() {
    const { book } = this.state;

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
            className="btn btn-primary book-details-btn"
            type="button"
            onClick={this.handleLike}
          >
            Like
          </button>
          <button
            className="btn btn-danger book-details-btn"
            type="button"
            onClick={this.handleUnlike}
          >
            Unlike
          </button>
          <button
            className="btn btn-warning book-details-btn"
            type="button"
            onClick={this.handleOrder}
          >
            Order
          </button>
        </BookDetailsView>

        <ReviewCreateForm
          handleChange={null}
          handleSubmit={this.handleSubmitReview}
        />
      </div>
    );
  }
}

export default BookDetails;
