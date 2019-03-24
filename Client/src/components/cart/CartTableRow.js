import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
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

    const { title, genres, image, price, quantity } = book;

    return (
      <tr>
        <td data-th="Product">
          <div className="row">
            <div className="col-sm-4 hidden-xs">
              <img src={image} alt={title} className="cart-image" />
            </div>
            <div className="col-sm-8">
              <h4 className="nomargin">{title}</h4>
              <p>{genres}</p>
            </div>
          </div>
        </td>
        <td data-th="Price">${price}</td>
        <td data-th="Quantity">x {quantity}</td>
        <td data-th="Subtotal" className="text-center">
          ${price * quantity}
        </td>
        <td className="actions" data-th="">
          <button
            className="btn btn-info btn-sm"
            onClick={this.updateBookInCart}
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={this.removeBookFromCart}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
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
