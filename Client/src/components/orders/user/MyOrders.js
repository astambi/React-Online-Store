import React, { Component } from "react";
import OrdersTable from "../OrdersTable";
import OrdersTableHeader from "../OrdersTableHeader";
import OrdersTableList from "../OrdersTableList";
import orderService from "../../../services/order-service";
import { paths } from "../../../constants/constants";

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      orders: []
    };
  }

  componentDidMount = async () => {
    const orders = await orderService.getUserOrders();
    console.log(orders);

    this.setState({ orders, isLoaded: true });
  };

  render() {
    const { isLoaded, orders } = this.state;

    if (!isLoaded) {
      return null;
    }

    return (
      <OrdersTable title="My orders">
        <OrdersTableHeader />

        <tbody>
          <OrdersTableList
            orders={orders}
            detailsPath={paths.orderDetailsPath}
          />
        </tbody>
      </OrdersTable>
    );
  }
}

export default MyOrders;
