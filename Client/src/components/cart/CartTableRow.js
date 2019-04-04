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

class CartTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {}
    };
  }

  componentDidMount = () => {
    const { book } = this.props;
    this.setState({ book });
  };

  changeQuantity = change => {
    const { user, updateUser } = this.props;
    let { book } = this.state;

    if (change === 0) {
      book.quantity = 0;
    } else if (change > 0) {
      book.quantity++;
    } else {
      book.quantity--;
    }
    this.setState({ book });

    let bookFromCart = user.cart.find(b => b._id === book._id);
    bookFromCart = book;
    const cart = user.cart.filter(cartItem => cartItem.quantity > 0);

    const userToUpdate = { ...user, cart };
    updateUser(userToUpdate);
  };

  handleDecreaseQuantity = () => this.changeQuantity(-1);

  handleIncreaseQuantity = () => this.changeQuantity(1);

  handleRemoveBookFromCart = () => this.changeQuantity(0);

  handleUpdateBookInCart = () => {
    console.log("TODO Cart Item refresh");
  };

  render() {
    const { book } = this.state;

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
          onClick={this.handleUpdateBookInCart}
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
