import React, { Component } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../constants/constants";

class Order extends Component {
  calculateOrderTotal(products) {
    let sum = 0;
    products
      .filter(p => p !== null && p !== undefined)
      .map(p => (p ? (sum += p.price * p.quantity) : 0));
    return sum;
  }

  getOrderProductsListing = products =>
    products
      .filter(p => p !== null)
      .map(p => p.title)
      .join(", ");

  render() {
    const { order, index } = this.props;
    const { _id, date, status, products } = order;

    const orderTotal = this.calculateOrderTotal(products).toFixed(2);
    const productTitles = this.getOrderProductsListing(products);

    return (
      <tr>
        <th>
          #{index} {productTitles}
        </th>
        <td>{date.slice(0, 10)}</td>
        <td>$ {orderTotal}</td>
        <td>
          <span className="label label-info">{status}</span>
        </td>
        <td>
          <Link
            to={`${paths.orderDetailsPath}/${_id}`}
            className="btn btn-outline-warning btn-sm"
          >
            {paths.orderDetailsName}
          </Link>
        </td>
      </tr>
    );
  }
}

export default Order;
