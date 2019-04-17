import React, { Component, Fragment } from "react";
import OrdersFilterButtons from "../OrdersFilterButtons";
import OrdersTable from "../OrdersTable";
import OrdersTableHeader from "../OrdersTableHeader";
import OrdersTableList from "../OrdersTableList";
import orderService from "../../../services/order-service";
import { paths } from "../../../constants/constants";

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      orders: [],
      action: "", // status filter
      actionBtnName: [],
      handleAction: []
    };
  }

  componentDidMount = async () => await this.loadPendingOrders();

  myOrders = async () => await orderService.getUserOrders();

  // Load Orders by Status
  loadApprovedOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: (await this.myOrders()).filter(o => o.status === "Approved"),
      action: paths.ordersApprovedName,
      handleAction: [],
      actionBtnName: []
    });
  };

  loadCancelledOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: (await this.myOrders()).filter(o => o.status === "Cancelled"),
      action: paths.ordersCancelledName,
      handleAction: [],
      actionBtnName: []
    });
  };

  loadDeliveredOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: (await this.myOrders()).filter(o => o.status === "Delivered"),
      action: paths.ordersDeliveredName,
      handleAction: [],
      actionBtnName: []
    });
  };

  loadPendingOrders = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      orders: (await this.myOrders()).filter(o => o.status === "Pending"),
      action: paths.ordersPendingName,
      handleAction: [this.handleCancelOrder],
      actionBtnName: ["Cancel"]
    });
  };

  handleCancelOrder = async id =>
    await orderService.updateOrderStatusById(
      id,
      orderService.cancelOrderById,
      this.loadCancelledOrders
    );

  render() {
    const { action } = this.state;

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
            {...this.state} // isLoading, orders
            detailsPath={paths.orderDetailsPath}
          />
        </OrdersTable>
      </Fragment>
    );
  }
}

export default MyOrders;
