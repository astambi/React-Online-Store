import React, { Component } from "react";
import AdminOrderDeliverBtn from "./AdminOrderDeliverBtn";
import AdminOrdersTable from "./AdminOrdersTable";
import orderService from "../../services/order-service";
import notificationService from "../../services/notification-service";

class AdminOrdersApproved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      error: null
    };
  }

  componentDidMount = async () => {
    const orders = await orderService.getApprovedOrders();
    console.log(orders);

    this.setState({ orders });
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
    const { orders } = this.state;

    return (
      <AdminOrdersTable
        title="Approved orders"
        orders={orders}
        actionBtn={AdminOrderDeliverBtn}
        handleAction={this.handleDeliverOrder}
      />
    );
  }
}

export default AdminOrdersApproved;
