import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../constants/constants";

const AdminOrderDetailsLink = props => {
  const { order } = props;

  return !order ? null : (
    <Link
      to={`${paths.orderDetailsAdminPath}/${order._id}`}
      className="btn btn-outline-warning btn-sm"
    >
      {paths.orderDetailsName}
    </Link>
  );
};

export default AdminOrderDetailsLink;
