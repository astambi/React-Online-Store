import React, { Component } from "react";
import OrderDetails from "../OrderDetails";
import orderService from "../../../services/order-service";
import { paths } from "../../../constants/constants";

class AdminOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      notFound: false,
      order: null
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.computedMatch.params; // NB

    this.setState({ isLoading: true });
    const order = await orderService.getOrderById(id);
    order === undefined
      ? this.setState({ isLoading: false, notFound: true })
      : this.setState({ isLoading: false, order });
  };

  render() {
    return (
      <OrderDetails
        {...this.state} // isLoading, notFound, order
        redirectPath={paths.ordersPendingPath}
      />
    );
  }
}

export default AdminOrderDetails;
