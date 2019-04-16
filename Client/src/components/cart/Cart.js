import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import CartTableBody from "./CartTableBody";
import CartTableFooter from "./CartTableFooter";
import ProductsTable from "../products/ProductsTable";
import ProductsTableHeader from "../products/ProductsTableHeader";
import bookService from "../../services/book-service";
import notificationService from "../../services/notification-service";
import orderService from "../../services/order-service";
import { calculateOrderTotal } from "../../services/helpers";
import { paths, notificationMessages } from "../../constants/constants";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isOrderCreated: false,
      availableBooks: [],
      orderId: null,
      error: {
        message: "",
        errors: []
      }
    };
  }

  componentDidMount = async () => {
    const { books } = this.props;

    this.setState({ isLoading: true });
    const availableBooks = await bookService.filterAvailableBooks(books);
    this.setState({ availableBooks, isLoading: false });
  };

  changeQuantity = async (book, change) => {
    const { user } = this.props;

    // Update book quantity
    const updatedBook = { ...book };
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

  handleCheckout = async () => {
    const { books } = this.props;

    // No books in cart
    if (!books || books.length === 0) {
      // Notification
      notificationService.infoMsg(notificationMessages.cartEmptyMsg);
      return;
    }

    try {
      const result = await orderService.createOrder(books);
      console.log(result);

      const { success, message, data, errors } = result;

      if (!success) {
        this.setState({
          error: { message, errors }
        });
      } else {
        // Order Created
        const { user, updateUser } = this.props;
        const userToUpdate = { ...user, cart: [] }; // clear shopping cart
        updateUser(userToUpdate);

        this.setState({
          isOrderCreated: true,
          orderId: data._id,
          error: {}
        });

        // Success Notification
        notificationService.successMsg(message);
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });

      // Error Notification
      notificationService.errorMsg(error);
    }
  };

  handleDecreaseQuantity = book => {
    this.changeQuantity(book, -1);

    // Success Notification
    notificationService.successMsg(notificationMessages.bookQuantityUpdatedMsg);
  };

  handleIncreaseQuantity = book => {
    this.changeQuantity(book, 1);

    // Success Notification
    notificationService.successMsg(notificationMessages.bookQuantityUpdatedMsg);
  };

  handleRemoveBookFromCart = book => {
    this.changeQuantity(book, 0);

    // Success Notification
    notificationService.successMsg(notificationMessages.bookRemovedFromCartMsg);
  };

  handleUpdateBookDetails = async (book, withNotifications = true) => {
    const { user } = this.props;

    // Find book in db
    const bookFromDb = await bookService.getBookById(book._id);

    // Book not found in DB
    if (bookFromDb === undefined) {
      this.changeQuantity(book, 0); // without notification

      if (withNotifications) {
        notificationService.successMsg(notificationMessages.bookNotFoundMsg);
      }

      return null;
    }

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

    // Success Notification
    if (withNotifications) {
      notificationService.successMsg(notificationMessages.bookInfoUpdatedMsg);
    }

    return updatedBook;
  };

  handleUpdateCart = async () => {
    const { books } = this.props;

    // Cart empty notification
    if (!books || books.length === 0) {
      notificationService.infoMsg(notificationMessages.cartEmptyMsg);
      return;
    }

    for (const book of books) {
      await this.handleUpdateBookDetails(book, false);
    }

    // Info Notification
    notificationService.successMsg(notificationMessages.cartUpdatedMsg);
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
    const { isLoading, isOrderCreated, orderId, availableBooks } = this.state;

    if (isOrderCreated) {
      return <Redirect to={`${paths.orderDetailsPath}/${orderId}`} />;
    }

    const { books } = this.props;
    const orderTotal = calculateOrderTotal(books);

    return (
      <section className="cart">
        <h1 className="text-center">Shopping cart</h1>

        <ProductsTable isLoading={isLoading}>
          <ProductsTableHeader>
            <th>Actions</th>
          </ProductsTableHeader>

          <CartTableBody
            books={books}
            availableBooks={availableBooks}
            // Actions handleClick props
            handleDecreaseQuantity={this.handleDecreaseQuantity}
            handleIncreaseQuantity={this.handleIncreaseQuantity}
            handleRemoveBookFromCart={this.handleRemoveBookFromCart}
            handleUpdateBookDetails={this.handleUpdateBookDetails}
          />

          <CartTableFooter
            orderTotal={orderTotal}
            handleCheckout={this.handleCheckout}
            handleUpdateCart={this.handleUpdateCart}
          />
        </ProductsTable>
      </section>
    );
  }
}

const CartWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <Cart {...props} books={user.cart} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default Cart;
export default CartWithContext;
