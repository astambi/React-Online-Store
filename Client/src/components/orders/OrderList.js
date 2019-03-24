import React, { Component } from "react";
import Order from "./Order";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    // TODO fetch
    const orders = [
      {
        _id: "5c76a2aa157aaa2c6084dc54",
        date: new Date(),
        total: 5,
        status: "Approved"
      },
      {
        _id: "5c76a2aa1554",
        date: new Date(),
        total: 15,
        status: "Pending"
      }
    ];

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
