import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faSyncAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import ProductTableRow from "../products/ProductTableRow";

const CartTableRow = props => {
  const {
    book,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleRemoveBookFromCart,
    handleUpdateBookDetails
  } = props;

  if (!book) {
    return null;
  }

  return (
    <ProductTableRow product={book}>
      <button
        className="btn btn-sm btn-outline-warning"
        onClick={() => handleDecreaseQuantity(book)}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>

      <button
        className="btn btn-sm btn-outline-success"
        onClick={() => handleIncreaseQuantity(book)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <button
        className="btn btn-sm btn-outline-info"
        onClick={() => handleUpdateBookDetails(book)}
      >
        <FontAwesomeIcon icon={faSyncAlt} />
      </button>

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => handleRemoveBookFromCart(book)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </ProductTableRow>
  );
};

export default CartTableRow;
