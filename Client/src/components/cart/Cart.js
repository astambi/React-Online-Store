import React, { Component } from "react";
import { UserConsumer } from "../contexts/user-context";
import CartTableHeader from "./CartTableHeader";
import CartTableBody from "./CartTableBody";
import CartTableFooter from "./CartTableFooter";

class Cart extends Component {
  calculateOrderTotal = books => {
    let orderTotal = 0;
    books.map(book => (orderTotal += book.price * book.quantity));
    return orderTotal;
  };

  render() {
    console.log("Cart", this.props);

    const { books } = this.props;
    const orderTotal = this.calculateOrderTotal(books);

    return (
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <CartTableHeader />
          <CartTableBody books={books} />
          <CartTableFooter orderTotal={orderTotal} />
        </table>
      </div>
    );
  }
}

const CartWithContext = props => (
  <UserConsumer>{({ user }) => <Cart books={user.cart} />}</UserConsumer>
);

// export default Cart;
export default CartWithContext;
