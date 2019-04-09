import React, { Component } from "react";
import OrderDetails from "./OrderDetails";
import orderService from "../../services/order-service";
import { paths } from "../../constants/constants";

class MyOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      order: null,
      notFound: false
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.computedMatch.params; // NB
    const order = await orderService.getUserOrderById(id);

    if (order === undefined) {
      this.setState({ isLoaded: true, notFound: true });
    } else {
      this.setState({ isLoaded: true, order });
    }
  };

  render() {
    const { isLoaded, ...otherProps } = this.state;

    if (!isLoaded) {
      return null;
    }

    return <OrderDetails {...otherProps} redirectPath={paths.ordersPath} />;
  }
}

export default MyOrderDetails;
