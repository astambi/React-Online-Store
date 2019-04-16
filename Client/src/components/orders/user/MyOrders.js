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
      isLoading: false,
      orders: []
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const orders = await orderService.getUserOrders();
    this.setState({ isLoading: false, orders });
  };

  render() {
    return (
      <OrdersTable title="My orders">
        <OrdersTableHeader />
        <OrdersTableList
          {...this.state} // isLoading, orders
          detailsPath={paths.orderDetailsPath}
        />
      </OrdersTable>
    );
  }
}

export default MyOrders;
