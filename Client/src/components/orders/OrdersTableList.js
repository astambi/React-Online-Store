import React from "react";
import OrdersTableRow from "./OrdersTableRow";
import withLoading from "../hocs/withLoading";

const OrdersTableList = props => {
  const { isLoading, orders, ...otherProps } = props;

  return (
    <tbody>
      {!orders || (orders && orders.length === 0) ? (
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
      )}
    </tbody>
  );
};

// export default OrdersTableList;
export default withLoading(OrdersTableList);
