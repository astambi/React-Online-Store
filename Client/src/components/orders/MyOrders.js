import React from "react";
import OrdersList from "./OrdersList";
import OrdersTable from "./OrdersTable";

const MyOrders = () => (
  <OrdersTable>
    <OrdersList />
  </OrdersTable>
);

export default MyOrders;
