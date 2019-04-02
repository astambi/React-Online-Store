import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import ProductTableRow from "../products/ProductTableRow";
import { UserConsumer } from "../contexts/user-context";

class CartTableRow extends Component {
  removeBookFromCart = () => {
    const { book, user, updateUser } = this.props;

    // Update Shopping cart
    const cart = user.cart.filter(cartItem => cartItem._id !== book._id);
    const userToUpdate = { ...user, cart };
    updateUser(userToUpdate);
  };

  updateBookInCart = () => {
    console.log("TODO Cart Item refresh");
  };

  render() {
    const { book } = this.props;

    if (!book) {
      return null;
    }

    return (
      <ProductTableRow product={book}>
        <button className="btn btn-info btn-sm" onClick={this.updateBookInCart}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={this.removeBookFromCart}
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
