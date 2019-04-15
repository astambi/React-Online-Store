import React from "react";
import OrdersTableRow from "./OrdersTableRow";

const OrdersTableList = props => {
  const { orders, ...otherProps } = props;

  return !orders || (orders && orders.length === 0) ? (
    <tr>
      <td colSpan={6}>No orders</td>
    </tr>
  ) : (
    orders.map((order, index) => (
      <OrdersTableRow
        key={order._id}
        order={order}
        index={index + 1}
        {...otherProps} // detailsPath, actionBtn, handleAction
      />
    ))
  );
};

export default OrdersTableList;
