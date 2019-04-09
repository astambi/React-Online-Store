import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  calculateOrderTotal,
  toCurrency,
  toShortDate
} from "../../services/helpers";
import { paths } from "../../constants/constants";

class PendingOrdersTableRow extends Component {
  handleApprove = () => {
    const { order, handleApproveOrder } = this.props;
    handleApproveOrder(order._id);
  };

  render() {
    const { order, index } = this.props;

    if (!order) {
      return null;
    }

    const { _id, date, products, status } = order;
    const orderTotal = calculateOrderTotal(products);

    return (
      <tr>
        <th>#{index}</th>
        <td>{toShortDate(date)}</td>
        <td className="text-right">{toCurrency(orderTotal)}</td>
        <td>
          <span className="label label-info">{status}</span>
        </td>
        <td>
          <Link
            to={`${paths.ordersPendingDetailsPath}/${_id}`}
            className="btn btn-outline-warning btn-sm"
          >
            {paths.orderDetailsName}
          </Link>
        </td>
        <td>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={this.handleApprove}
          >
            Approve
          </button>
        </td>
      </tr>
    );
  }
}

export default PendingOrdersTableRow;
