import React from "react";
import { Link } from "react-router-dom";
import { toCurrency } from "../../services/helpers";
import { paths } from "../../constants/constants";

const ProductTableRow = props => {
  const { product, children } = props;

  if (!product) {
    return null;
  }

  const { title, genres, image, price, quantity } = product;

  return (
    <tr>
      <td data-th="Product" className="product">
        <div className="row">
          <div className="image">
            <Link to={paths.bookDetailsPath + "/" + product._id}>
              <img src={image} alt={title} className="cart-image" />
            </Link>
          </div>
          <div className="pl-2">
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

      {/* Actions */}
      {!children ? null : (
        <td data-th="Actions" className="actions d-flex justify-content-around">
          {children}
        </td>
      )}
    </tr>
  );
};

export default ProductTableRow;
