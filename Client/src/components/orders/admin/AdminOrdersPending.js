import React, { Component } from "react";
import AdminOrderApproveBtn from "./AdminOrderApproveBtn";
import AdminOrdersTable from "./AdminOrdersTable";
import orderService from "../../../services/order-service";
import notificationService from "../../../services/notification-service";

class AdminOrdersPending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      error: null
    };
  }

  componentDidMount = async () => {
    const orders = await orderService.getPendingOrders();
    console.log(orders);

    this.setState({ orders });
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

  render() {
    const { orders } = this.state;

    return (
      <AdminOrdersTable
        title="Pending orders"
        orders={orders}
        actionBtn={AdminOrderApproveBtn}
        handleAction={this.handleApproveOrder}
      />
    );
  }
}

export default AdminOrdersPending;
