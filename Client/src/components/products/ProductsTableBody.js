import React from "react";
import ProductTableRow from "./ProductTableRow";

const ProductsTableBody = props => {
  const { products, availableProducts, children } = props;

  return (
    <tbody>
      {products && products.length !== 0 ? (
        products.map(product =>
          product ? (
            <ProductTableRow
              key={product._id}
              product={product}
              isAvailable={availableProducts.includes(product._id)}
            >
              {/* Actions */}
              {children}
            </ProductTableRow>
          ) : null
        )
      ) : (
        <tr>
          <td colSpan="5">No books</td>
        </tr>
      )}
    </tbody>
  );
};

export default ProductsTableBody;
