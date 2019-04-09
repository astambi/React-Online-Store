import React from "react";

const PendingOrderApproveBtn = props => {
  const { order, handleApprove } = props;

  if (!order || !handleApprove) {
    return null;
  }

  return (
    <button
      className="btn btn-outline-success btn-sm"
      onClick={() => handleApprove(order._id)}
    >
      Approve
    </button>
  );
};

export default PendingOrderApproveBtn;
