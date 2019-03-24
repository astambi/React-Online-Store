import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const CartTableRow = props => {
  console.log("Row ", props);

  const { book } = props;
  if (!book) {
    return null;
  }

  const removeBookFromCart = bookIdToRemove => {
    console.log(bookIdToRemove);
    console.log("TODO Remove book");
  };

  const { _id, genres, image, price, quantity, title } = book;

  return (
    <tr>
      <td data-th="Product">
        <div className="row">
          <div className="col-sm-4 hidden-xs">
            <img src={image} alt={title} className="cart-image" />
          </div>
          <div className="col-sm-8">
            <h4 className="nomargin">{title}</h4>
            <p>{genres}</p>
          </div>
        </div>
      </td>
      <td data-th="Price">${price}</td>
      <td data-th="Quantity">x {quantity}</td>
      <td data-th="Subtotal" className="text-center">
        ${price * quantity}
      </td>
      <td className="actions" data-th="">
        <button className="btn btn-info btn-sm">
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
        <button
          onClick={() => removeBookFromCart(_id)}
          className="btn btn-danger btn-sm"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default CartTableRow;
