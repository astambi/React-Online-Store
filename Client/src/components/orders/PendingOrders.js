import React, { Component } from "react";
import OrdersTable from "./OrdersTable";
import OrdersTableHeader from "./OrdersTableHeader";
import OrdersTableList from "./OrdersTableList";
import PendingOrderApproveBtn from "./PendingOrderApproveBtn";
import PendingOrderViewLink from "./PendingOrderViewLink";
import orderService from "../../services/order-service";
import notificationService from "../../services/notification-service";

class PendingOrders extends Component {
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
      <OrdersTable title="Pending orders">
        <OrdersTableHeader>
          <th>Action</th>
        </OrdersTableHeader>

        <tbody>
          <OrdersTableList
            orders={orders}
            detailsLink={PendingOrderViewLink}
            approveLink={PendingOrderApproveBtn}
            handleApprove={this.handleApproveOrder}
          />
        </tbody>
      </OrdersTable>
    );
  }
}

export default PendingOrders;
