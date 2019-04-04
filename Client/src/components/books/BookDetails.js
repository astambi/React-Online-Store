import React from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComments,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import BookDetailsView from "./BookDetailsView";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import ReviewsList from "../reviews/ReviewsList";
import { UserConsumer } from "../contexts/user-context";
import bookService from "../../services/book-service";
import { handleInputChange } from "../../services/helpers";
import { paths } from "../../constants/constants";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  addBookToCart(book, cart) {
    const { _id, title, image, genres, price } = book;
    cart.push({ _id, title, image, genres, price, quantity: 1 });
  }

  updateBookQuantity(bookToOrder) {
    bookToOrder.quantity += 1;
  }

  handleOrderBook = () => {
    const { user, updateUser } = this.props;
    const { book } = this.state;
    let cart = user.cart.slice();

    // Add book to cart
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

    return (
      <div className="container">
        <BookDetailsView book={book}>
          <button
            className="btn btn-outline-primary book-details-btn"
            type="button"
            onClick={this.handleLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> Like
          </button>
          <button
            className="btn btn-outline-danger book-details-btn"
            type="button"
            onClick={this.handleUnlike}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> Unlike
          </button>
          <button
            className="btn btn-outline-info book-details-btn"
            type="button"
            onClick={this.handleReviewsVisibility}
          >
            <FontAwesomeIcon icon={faComments} /> Reviews ({book.reviews.length}
            )
          </button>
          <button
            className="btn btn-outline-warning book-details-btn"
            type="button"
            onClick={this.handleOrderBook}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Order
          </button>
        </BookDetailsView>

        {showReviews ? (
          <section className="row justify-content-end">
            <section className="col-lg-9">
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

const BookDetailsWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <BookDetails {...props} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default BookDetails;
export default BookDetailsWithContext;
