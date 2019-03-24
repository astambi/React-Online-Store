import React, { Component } from "react";
import Order from "./Order";
import orderService from "../../services/order-service";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  async componentDidMount() {
    const orders = await orderService.getUserOrders();
    console.log(orders);

    this.setState({ orders });
  }

  render() {
    const { orders } = this.state;

    return orders.map((order, index) => (
      <Order key={order._id} order={order} index={index + 1} />
    ));
  }
}

export default OrderList;
