import React from "react";

const CardTableHead = () => (
  <thead>
    <tr>
      <th style={{ width: 50 + "px" }}>Product</th>
      <th style={{ width: 10 + "px" }}>Price</th>
      <th style={{ width: 10 + "px" }}>Quantity</th>
      <th className="text-center" style={{ width: 22 + "px" }}>
        Subtotal
      </th>
      <th style={{ width: 10 + "px" }}>Actions</th>
    </tr>
  </thead>
);

export default CardTableHead;
