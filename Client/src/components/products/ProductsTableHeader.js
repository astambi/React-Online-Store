import React from "react";

const ProductsTableHeader = props => {
  const { children } = props;

  return (
    <thead>
      <tr>
        <th className="product">Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th className="text-center">Subtotal</th>

        {/* Actions */}
        {children || null}
      </tr>
    </thead>
  );
};

export default ProductsTableHeader;
