import React from "react";

const OrdersTableHeader = props => {
  const { children } = props;

  return (
    <thead>
      <tr>
        <th>Order</th>
        <th>Date</th>
        <th>Total</th>
        <th>Status</th>
        <th>View</th>

        {/* extra headers */}
        {children}
      </tr>
    </thead>
  );
};

export default OrdersTableHeader;
