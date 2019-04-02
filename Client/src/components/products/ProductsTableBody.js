import React from "react";
import ProductTableRow from "./ProductTableRow";

const ProductsTableBody = props => {
  const { products, children } = props;

  return (
    <tbody>
      {products && products.length !== 0 ? (
        products.map(p =>
          p ? (
            <ProductTableRow key={p._id} product={p}>
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
