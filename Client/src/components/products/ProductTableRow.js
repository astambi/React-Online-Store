import React from "react";
import { toCurrency } from "../../services/helpers";

const ProductTableRow = props => {
  const { product, children } = props;

  if (!product) {
    return null;
  }

  const { title, genres, image, price, quantity } = product;

  return (
    <tr>
      <td data-th="Product">
        <div className="row">
          <div className="col-sm-4 hidden-xs">
            <img src={image} alt={title} className="cart-image" />
          </div>
          <div className="col-sm-8">
            <h4 className="nomargin">{title}</h4>
            <p className="text-truncate">{genres}</p>
          </div>
        </div>
      </td>
      <td data-th="Price" className="text-center">
        {toCurrency(price)}
      </td>
      <td data-th="Quantity" className="text-center">
        x {quantity}
      </td>
      <td data-th="Subtotal" className="text-center">
        {toCurrency(price * quantity)}
      </td>

      {children ? (
        <td data-th="Actions" className="actions d-flex justify-content-around">
          {children}
        </td>
      ) : null}
    </tr>
  );
};

export default ProductTableRow;
