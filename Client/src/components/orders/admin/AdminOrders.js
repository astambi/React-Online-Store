import React, { Component, Fragment } from "react";
import AdminOrdersTable from "./AdminOrdersTable";
import CustomButton from "../../common/CustomButton";
import orderService from "../../../services/order-service";
import notificationService from "../../../services/notification-service";
import { paths } from "../../../constants/constants";

class AdminOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action: "",
      actionBtnName: [],
      handleAction: [],
      orders: [],
      error: null
    };
  }

  loadApprovedOrders = async () => {
    const orders = await orderService.getApprovedOrders();

    this.setState({
      orders,
      action: paths.ordersApprovedName,
      handleAction: [this.handleDeliverOrder, this.handleCancelOrder],
      actionBtnName: ["Deliver", "Cancel"]
    });
  };

  loadCancelledOrders = async () => {
    const orders = await orderService.getCancelledOrders();

    this.setState({
      orders,
      action: paths.ordersCancelledName,
      handleAction: [this.handleApproveOrder],
      actionBtnName: ["Approve"]
    });
  };

  loadDeliveredOrders = async () => {
    const orders = await orderService.getDeliveredOrders();

    this.setState({
      orders,
      action: paths.ordersDeliveredName,
      handleAction: [],
      actionBtnName: []
    });
  };

  loadPendingOrders = async () => {
    const orders = await orderService.getPendingOrders();

    this.setState({
      orders,
      action: paths.ordersPendingName,
      handleAction: [this.handleApproveOrder, this.handleCancelOrder],
      actionBtnName: ["Approve", "Cancel"]
    });
  };

  handleApproveOrder = async id => {
    if (!id) {
      this.setState({ error: "Invalid Order Id" });
      return;
    }

    const result = await orderService.approveOrderById(id);
    const { message, success } = result;
    console.log(result);

    if (!success) {
      this.setState({ error: message });

      // Error Notification
      notificationService.errorMsg(message);
    } else {
      // Update pending orders
      await this.loadApprovedOrders();

      // Success Notification
      notificationService.successMsg(message);
    }
  };

  handleCancelOrder = async id => {
    if (!id) {
      this.setState({ error: "Invalid Order Id" });
      return;
    }

    const result = await orderService.cancelOrderById(id);
    const { message, success } = result;
    console.log(result);

    if (!success) {
      this.setState({ error: message });

      // Error Notification
      notificationService.errorMsg(message);
    } else {
      // Update pending orders
      await this.loadCancelledOrders();

      // Success Notification
      notificationService.successMsg(message);
    }
  };

  handleDeliverOrder = async id => {
    if (!id) {
      this.setState({ error: "Invalid Order Id" });
      return;
    }

    const result = await orderService.deliverOrderById(id);
    const { message, success } = result;
    console.log(result);

    if (!success) {
      this.setState({ error: message });

      // Error Notification
      notificationService.errorMsg(message);
    } else {
      // Update orders
      await this.loadDeliveredOrders();

      // Success Notification
      notificationService.successMsg(message);
    }
  };

  render() {
    const { action, orders, handleAction, actionBtnName } = this.state;

    return (
      <Fragment>
        <section className="admin-orders-links row justify-content-around mb-3">
          <CustomButton
            className="mt-1 mb-1"
            name={paths.ordersPendingName}
            handleAction={() => this.loadPendingOrders()}
            outline={action !== paths.ordersPendingName}
            color="warning"
          />

          <CustomButton
            className="mt-1 mb-1"
            name={paths.ordersCancelledName}
            handleAction={() => this.loadCancelledOrders()}
            outline={action !== paths.ordersCancelledName}
            color="danger"
          />

          <CustomButton
            className="mt-1 mb-1"
            name={paths.ordersApprovedName}
            handleAction={() => this.loadApprovedOrders()}
            outline={action !== paths.ordersApprovedName}
            color="success"
          />

          <CustomButton
            className="mt-1 mb-1"
            name={paths.ordersDeliveredName}
            handleAction={() => this.loadDeliveredOrders()}
            outline={action !== paths.ordersDeliveredName}
            color="primary"
          />
        </section>

        <AdminOrdersTable
          title={action}
          orders={orders}
          actionBtnName={actionBtnName}
          handleAction={handleAction}
        />
      </Fragment>
    );
  }
}

export default AdminOrders;
