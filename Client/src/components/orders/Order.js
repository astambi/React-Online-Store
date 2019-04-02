import React from "react";
import { Link } from "react-router-dom";
import {
  calculateOrderTotal,
  getProductsTitles,
  toCurrency,
  toShortDate
} from "../../services/helpers";
import { paths } from "../../constants/constants";

const Order = props => {
  const { order, index } = props;

  if (!order) {
    return (
      <tr>
        <td colSpan={5}>Order does not exist</td>
      </tr>
    );
  }

  const { _id, date, status, products } = order;
  const orderTotal = calculateOrderTotal(products);
  const productTitles = getProductsTitles(products);

  return (
    <tr>
      <th>
        #{index} {productTitles}
      </th>
      <td>{toShortDate(date)}</td>
      <td>{toCurrency(orderTotal)}</td>
      <td>
        <span className="label label-info">{status}</span>
      </td>
      <td>
        <Link
          to={{
            pathname: `${paths.orderDetailsPath}/${_id}`,
            state: { order }
          }}
          className="btn btn-outline-warning btn-sm"
        >
          {paths.orderDetailsName}
        </Link>
      </td>
    </tr>
  );
};

export default Order;
