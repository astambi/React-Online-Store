import React from "react";
import CustomButton from "../../common/CustomButton";
import { paths } from "../../../constants/constants";

const AdminOrdersButtons = props => {
  const {
    action,
    loadApprovedOrders,
    loadCancelledOrders,
    loadDeliveredOrders,
    loadPendingOrders
  } = props;

  return (
    <section className="admin-orders-links row justify-content-around mb-3">
      <CustomButton
        className="mt-1 mb-1"
        color="warning"
        name={paths.ordersPendingName}
        outline={action !== paths.ordersPendingName}
        handleAction={loadPendingOrders}
      />

      <CustomButton
        className="mt-1 mb-1"
        color="danger"
        name={paths.ordersCancelledName}
        outline={action !== paths.ordersCancelledName}
        handleAction={loadCancelledOrders}
      />

      <CustomButton
        className="mt-1 mb-1"
        color="success"
        name={paths.ordersApprovedName}
        outline={action !== paths.ordersApprovedName}
        handleAction={loadApprovedOrders}
      />

      <CustomButton
        className="mt-1 mb-1"
        color="primary"
        name={paths.ordersDeliveredName}
        outline={action !== paths.ordersDeliveredName}
        handleAction={loadDeliveredOrders}
      />
    </section>
  );
};

export default AdminOrdersButtons;
