import React, { Component, Fragment } from "react";
import OrdersFilterButtons from "../OrdersFilterButtons";
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
      action: "", // filter by status
      actionBtnName: [],
      handleAction: [],
      orders: []
    };
  }

  // Load Admin Orders by Status
  loadApprovedOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: await orderService.getApprovedOrders(),
      action: paths.ordersApprovedName,
      handleAction: [this.handleCancelOrder, this.handleDeliverOrder],
      actionBtnName: ["Cancel", "Deliver"]
    });
  };

  loadCancelledOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: await orderService.getCancelledOrders(),
      action: paths.ordersCancelledName,
      handleAction: [this.handleApproveOrder],
      actionBtnName: ["Approve"]
    });
  };

  loadDeliveredOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: await orderService.getDeliveredOrders(),
      action: paths.ordersDeliveredName,
      handleAction: [this.handleCancelOrder],
      actionBtnName: ["Cancel"]
    });
  };

  loadPendingOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: await orderService.getPendingOrders(),
      action: paths.ordersPendingName,
      handleAction: [this.handleCancelOrder, this.handleApproveOrder],
      actionBtnName: ["Cancel", "Approve"]
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
        <OrdersFilterButtons
          action={action}
          loadApprovedOrders={this.loadApprovedOrders}
          loadCancelledOrders={this.loadCancelledOrders}
          loadDeliveredOrders={this.loadDeliveredOrders}
          loadPendingOrders={this.loadPendingOrders}
        />

        <OrdersTable title={action}>
          <OrdersTableHeader />
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
