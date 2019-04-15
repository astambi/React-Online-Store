import React from "react";
import OrdersTable from "../OrdersTable";
import OrdersTableHeader from "../OrdersTableHeader";
import OrdersTableList from "../OrdersTableList";
import { paths } from "../../../constants/constants";

const AdminOrdersTable = props => {
  const { title, ...otherProps } = props;

  return (
    <OrdersTable
      title={title === "" ? "Please filter orders by status" : title}
    >
      <OrdersTableHeader>
        <th>Action</th>
      </OrdersTableHeader>

      <tbody>
        <OrdersTableList
          {...otherProps} // orders, actionBtn, handleAction
          detailsPath={paths.orderDetailsAdminPath}
        />
      </tbody>
    </OrdersTable>
  );
};

export default AdminOrdersTable;
