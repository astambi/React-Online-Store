import React, { Component } from "react";
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
          to={`${paths.orderDetailsPath}/${_id}`}
          className="btn btn-outline-warning btn-sm"
        >
          {paths.orderDetailsName}
        </Link>
      </td>
    </tr>
  );
};

export default Order;
