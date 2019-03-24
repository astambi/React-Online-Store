import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import CartTable from "./CartTable";
import CartTableHeader from "./CartTableHeader";
import CartTableBody from "./CartTableBody";
import CartTableFooter from "./CartTableFooter";
import orderService from "../../services/order-service";
import { paths } from "../../constants/constants";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOrderCreated: false,
      error: {
        message: "",
        errors: []
      }
    };
  }

  calculateOrderTotal = books => {
    let orderTotal = 0;
    books.map(book => (orderTotal += book.price * book.quantity));
    return orderTotal;
  };

  checkout = async () => {
    const { books } = this.props;

    // No books in cart
    if (!books || books.length === 0) {
      return;
    }

    try {
      const result = await orderService.createOrder(books);
      console.log(result);

      const { success, message, errors } = result;

      if (!success) {
        this.setState({
          error: { message, errors }
        });
      } else {
        // Order Created
        const { user, updateUser } = this.props;
        const userToUpdate = { ...user, cart: [] }; // clear shopping cart
        updateUser(userToUpdate);

        this.setState({ isOrderCreated: true, error: {} });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  };

  render() {
    const { isOrderCreated } = this.state;
    if (isOrderCreated) {
      return <Redirect to={paths.ordersPath} />;
    }

    const { books } = this.props;
    const orderTotal = this.calculateOrderTotal(books);

    return (
      <CartTable>
        <CartTableHeader />
        <CartTableBody books={books} />
        <CartTableFooter orderTotal={orderTotal} checkout={this.checkout} />
      </CartTable>
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
