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
      actionBtnName: "",
      handleAction: null,
      orders: [],
      error: null
    };
  }

  componentDidMount = async () => {
    await this.loadPendingOrders();

    console.log(this.state.orders);
  };

  loadApprovedOrders = async () => {
    const orders = await orderService.getApprovedOrders();

    this.setState({
      orders,
      action: paths.ordersApprovedName,
      handleAction: this.handleDeliverOrder,
      actionBtnName: "Deliver"
    });
  };

  loadDeliveredOrders = async () => {
    const orders = await orderService.getDeliveredOrders();

    this.setState({
      orders,
      action: paths.ordersDeliveredName,
      handleAction: null,
      actionBtnName: "Archive"
    });
  };

  loadPendingOrders = async () => {
    const orders = await orderService.getPendingOrders();

    this.setState({
      orders,
      action: paths.ordersPendingName,
      handleAction: this.handleApproveOrder,
      actionBtnName: "Approve"
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
      const orders = await orderService.getPendingOrders();
      this.setState({
        orders,
        error: null
      });

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
      const orders = await orderService.getApprovedOrders();
      this.setState({
        orders,
        error: null
      });

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
            name={paths.ordersPendingName}
            handleAction={() => this.loadPendingOrders()}
            outline={action !== paths.ordersPendingName}
            color="primary"
          />

          <CustomButton
            name={paths.ordersApprovedName}
            handleAction={() => this.loadApprovedOrders()}
            outline={action !== paths.ordersApprovedName}
            color="primary"
          />

          <CustomButton
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
