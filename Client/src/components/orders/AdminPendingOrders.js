import React, { Component } from "react";
import PendingOrdersTable from "./PendingOrdersTable";
import PendingOrdersTableHeader from "./PendingOrdersTableHeader";
import PendingOrdersTableRow from "./PendingOrdersTableRow";
import orderService from "../../services/order-service";

class AdminPendingOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    const orders = await orderService.getPendingOrders();
    this.setState({ orders });
  };

  approveOrder = id => {
    console.log("Approved " + id);
  };

  render() {
    const { orders } = this.state;

    return (
      <PendingOrdersTable>
        <PendingOrdersTableHeader />

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6}>No pending orders</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <PendingOrdersTableRow
                key={order._id}
                order={order}
                index={index + 1}
                approveOrder={this.approveOrder}
              />
            ))
          )}
        </tbody>
      </PendingOrdersTable>
    );
  }
}

export default AdminPendingOrders;
