import React, { Component } from "react";
import OrderRow from "./OrderRow";
import orderService from "../../services/order-service";

class OrdersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    const orders = await orderService.getUserOrders();
    console.log(orders);

    this.setState({ orders });
  };

  render() {
    const { orders } = this.state;

    if (orders.length === 0) {
      return (
        <tr>
          <td colSpan={5}>No orders</td>
        </tr>
      );
    }

    return orders.map((order, index) => (
      <OrderRow key={order._id} order={order} index={index + 1} />
    ));
  }
}

export default OrdersList;
