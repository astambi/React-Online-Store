import React from "react";
import { Link } from "react-router-dom";
import {
  calculateOrderTotal,
  getProductsTitles,
  toCurrency,
  toShortDate
} from "../../services/helpers";
import { paths } from "../../constants/constants";

const OrderRow = props => {
  const { order, index } = props;

  if (!order) {
    return null;
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
      <td className="text-right">{toCurrency(orderTotal)}</td>
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
};

export default OrderRow;
