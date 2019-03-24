import React, { Component } from "react";
import OrdersTable from "./OrdersTable";
import OrderList from "./OrderList";

class MyOrders extends Component {
  render() {
    return (
      <OrdersTable>
        <OrderList />
      </OrdersTable>
    );
  }
}

export default MyOrders;
