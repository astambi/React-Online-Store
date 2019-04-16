import React, { Component, Fragment } from "react";
import AdminOrdersButtons from "./AdminOrdersButtons";
import OrdersTable from "../OrdersTable";
import OrdersTableHeader from "../OrdersTableHeader";
import OrdersTableList from "../OrdersTableList";
import orderService from "../../../services/order-service";
import { paths } from "../../../constants/constants";

class AdminOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      action: "",
      actionBtnName: [],
      handleAction: [],
      orders: []
    };
  }

  // Load Orders by Status
  loadApprovedOrders = async () => {
    this.setState({ isLoading: true });
    const orders = await orderService.getApprovedOrders();

    this.setState({
      isLoading: false,
      orders,
      action: paths.ordersApprovedName,
      handleAction: [this.handleDeliverOrder, this.handleCancelOrder],
      actionBtnName: ["Deliver", "Cancel"]
    });
  };

  loadCancelledOrders = async () => {
    this.setState({ isLoading: true });
    const orders = await orderService.getCancelledOrders();

    this.setState({
      isLoading: false,
      orders,
      action: paths.ordersCancelledName,
      handleAction: [this.handleApproveOrder],
      actionBtnName: ["Approve"]
    });
  };

  loadDeliveredOrders = async () => {
    this.setState({ isLoading: true });
    const orders = await orderService.getDeliveredOrders();

    this.setState({
      isLoading: false,
      orders,
      action: paths.ordersDeliveredName,
      handleAction: [this.handleCancelOrder],
      actionBtnName: ["Cancel"]
    });
  };

  loadPendingOrders = async () => {
    this.setState({ isLoading: true });
    const orders = await orderService.getPendingOrders();

    this.setState({
      isLoading: false,
      orders,
      action: paths.ordersPendingName,
      handleAction: [this.handleApproveOrder, this.handleCancelOrder],
      actionBtnName: ["Approve", "Cancel"]
    });
  };

  // Handle Order Status Updates
  handleApproveOrder = async id =>
    await orderService.updateOrderStatusById(
      id,
      orderService.approveOrderById,
      this.loadApprovedOrders
    );

  handleCancelOrder = async id =>
    await orderService.updateOrderStatusById(
      id,
      orderService.cancelOrderById,
      this.loadCancelledOrders
    );

  handleDeliverOrder = async id =>
    await orderService.updateOrderStatusById(
      id,
      orderService.deliverOrderById,
      this.loadDeliveredOrders
    );

  render() {
    const { action, ...otherProps } = this.state;

    return (
      <Fragment>
        <AdminOrdersButtons
          action={action}
          loadApprovedOrders={this.loadApprovedOrders}
          loadCancelledOrders={this.loadCancelledOrders}
          loadDeliveredOrders={this.loadDeliveredOrders}
          loadPendingOrders={this.loadPendingOrders}
        />

        <OrdersTable title={action === "" ? "Filter orders by status" : action}>
          <OrdersTableHeader>
            <th>Action</th>
          </OrdersTableHeader>

          <OrdersTableList
            {...otherProps} // isLoading, orders, actionBtn, handleAction
            detailsPath={paths.orderDetailsAdminPath}
          />
        </OrdersTable>
      </Fragment>
    );
  }
}

export default AdminOrders;
