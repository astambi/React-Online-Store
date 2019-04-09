import React from "react";
import AdminOrderDetailsLink from "./AdminOrderDetailsLink";
import OrdersTable from "../OrdersTable";
import OrdersTableHeader from "../OrdersTableHeader";
import OrdersTableList from "../OrdersTableList";

const AdminOrdersTable = props => {
  const { title, ...actionProps } = props;

  return (
    <OrdersTable title={title}>
      <OrdersTableHeader>
        <th>Action</th>
      </OrdersTableHeader>

      <tbody>
        <OrdersTableList
          {...actionProps} // actionBtn, handleAction
          detailsLink={AdminOrderDetailsLink}
        />
      </tbody>
    </OrdersTable>
  );
};

export default AdminOrdersTable;
