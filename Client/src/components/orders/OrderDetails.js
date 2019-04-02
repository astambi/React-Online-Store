import React, { Component } from "react";
import OrderDetailsTableFooter from "./OrderDetailsTableFooter";
import ProductsTable from "../products/ProductsTable";
import ProductsTableHeader from "../products/ProductsTableHeader";
import ProductsTableBody from "../products/ProductsTableBody";
import { calculateOrderTotal, toShortDate } from "../../services/helpers";

class OrderDetails extends Component {
  render() {
    const { state } = this.props.location; // from Link

    if (state === undefined || !state || !state.order) {
      return <h1>Order does not exist</h1>;
    }

    const { order } = state;
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
