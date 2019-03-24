import React, { Component } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../constants/constants";

class Order extends Component {
  render() {
    const { order, index } = this.props;
    const { _id, date, total, status } = order;

    return (
      <tr>
        <th>#{index}</th>
        <td>{date.toLocaleDateString()}</td>
        <td>$ {total.toFixed(2)}</td>
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
