import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import CartTableBody from "./CartTableBody";
import CartTableFooter from "./CartTableFooter";
import ProductsTable from "../products/ProductsTable";
import ProductsTableHeader from "../products/ProductsTableHeader";
import orderService from "../../services/order-service";
import notificationService from "../../services/notification-service";
import { calculateOrderTotal } from "../../services/helpers";
import { paths, notificationMessages } from "../../constants/constants";

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

  checkout = async () => {
    const { books } = this.props;

    // No books in cart
    if (!books || books.length === 0) {
      // Warning Notification
      notificationService.warningMsg(notificationMessages.cartEmpty);
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

  render() {
    const { isOrderCreated } = this.state;

    if (isOrderCreated) {
      return <Redirect to={paths.ordersPath} />;
    }

    const { books } = this.props;
    const orderTotal = calculateOrderTotal(books);

    return (
      <ProductsTable>
        <ProductsTableHeader>
          <th style={{ width: 10 + "px" }}>Actions</th>
        </ProductsTableHeader>

        <CartTableBody books={books} />

        <CartTableFooter orderTotal={orderTotal} checkout={this.checkout} />
      </ProductsTable>
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
