import React from "react";

const AdminOrderActionBtn = props => {
  const { order, handleAction, name } = props;

  if (!order || !handleAction) {
    return null;
  }

  return (
    <button
      className="btn btn-outline-success btn-sm text-capitalize"
      onClick={() => handleAction(order._id)}
    >
      {name}
    </button>
  );
};

export default AdminOrderActionBtn;
