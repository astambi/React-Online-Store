import React, { Component } from "react";
import OrderDetailsTableFooter from "./OrderDetailsTableFooter";
import ProductsTable from "../products/ProductsTable";
import ProductsTableHeader from "../products/ProductsTableHeader";
import ProductsTableBody from "../products/ProductsTableBody";
import orderService from "../../services/order-service";
import { calculateOrderTotal, toShortDate } from "../../services/helpers";

class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.computedMatch.params;

    const orders = await orderService.getUserOrders();
    const order = orders.find(o => o._id === id);

    this.setState({ order });
  };

  render() {
    const { order } = this.state;
    console.log(order);

    if (!order) {
      return <h1>Order does not exist</h1>;
    }

    const { date, status, products } = order;
    const orderTotal = calculateOrderTotal(products);

    return (
      <div className="container">
        <h1>
          {status} Order ({toShortDate(date)})
        </h1>

        <ProductsTable>
          <ProductsTableHeader />
          <ProductsTableBody products={products} />

          <OrderDetailsTableFooter orderTotal={orderTotal} />
        </ProductsTable>
      </div>
    );
  }
}

export default OrderDetails;
