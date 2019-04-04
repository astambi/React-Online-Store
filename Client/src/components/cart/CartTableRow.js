import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faSyncAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import ProductTableRow from "../products/ProductTableRow";
import { UserConsumer } from "../contexts/user-context";
import bookService from "../../services/book-service";

class CartTableRow extends Component {
  changeQuantity = change => {
    const { user, book } = this.props;

    // Update book quantity
    let updatedBook = { ...book };
    if (change > 0) {
      updatedBook.quantity++;
    } else if (change < 0) {
      updatedBook.quantity--;
    } else {
      updatedBook.quantity = 0;
    }

    // Find book in cart
    const bookFromCart = user.cart.find(b => b._id === book._id);
    const bookIndexInCart = user.cart.indexOf(bookFromCart);

    // Update storage & state
    this.updateBook(updatedBook, bookIndexInCart);
  };

  handleDecreaseQuantity = () => this.changeQuantity(-1);

  handleIncreaseQuantity = () => this.changeQuantity(1);

  handleRemoveBookFromCart = () => this.changeQuantity(0);

  handleUpdateBookDetails = async () => {
    const { user, book } = this.props;

    // Find book in db
    const allBooks = await bookService.getAllBooks();
    const bookFromDb = allBooks.find(b => b._id === book._id);
    const { image, genres, title, price } = bookFromDb;

    // Find book in cart
    const bookFromCart = user.cart.find(b => b._id === book._id);
    const bookIndexInCart = user.cart.indexOf(bookFromCart);

    // Update book details other than quantity
    const updatedBook = {
      ...bookFromCart, // id
      image,
      genres,
      title,
      price,
      quantity: bookFromCart.quantity
    };

    // Update storage & state
    this.updateBook(updatedBook, bookIndexInCart);
  };

  updateBook = (book, bookIndexInCart) => {
    const { user, updateUser } = this.props;

    // Update book in cart
    user.cart[bookIndexInCart] = book;

    // Remove 0 quantity books from cart
    const cart = user.cart.filter(cartItem => cartItem.quantity > 0);

    // Update user cart
    const userToUpdate = { ...user, cart };
    updateUser(userToUpdate);
  };

  render() {
    const { book } = this.props;

    if (!book) {
      return null;
    }

    return (
      <ProductTableRow product={book}>
        <button
          className="btn btn-outline-warning btn-sm"
          onClick={this.handleDecreaseQuantity}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          className="btn btn-outline-success btn-sm"
          onClick={this.handleIncreaseQuantity}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="btn btn-outline-info btn-sm"
          onClick={this.handleUpdateBookDetails}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={this.handleRemoveBookFromCart}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </ProductTableRow>
    );
  }
}

const CartTableRowWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <CartTableRow {...props} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default CartTableRow;
export default CartTableRowWithContext;
