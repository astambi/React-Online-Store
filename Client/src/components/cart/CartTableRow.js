import React from "react";
import ButtonDecrease from "../common/ButtonDecrease";
import ButtonIncrease from "../common/ButtonIncrease";
import ButtonRemove from "../common/ButtonRemove";
import ButtonUpdate from "../common/ButtonUpdate";
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
      {/* Actions */}
      <ButtonDecrease
        handleAction={() => handleDecreaseQuantity(book)}
        size="sm"
      />
      <ButtonIncrease
        handleAction={() => handleIncreaseQuantity(book)}
        size="sm"
      />
      <ButtonUpdate
        handleAction={() => handleUpdateBookDetails(book)}
        size="sm"
      />
      <ButtonRemove
        handleAction={() => handleRemoveBookFromCart(book)}
        size="sm"
      />
    </ProductTableRow>
  );
};

export default CartTableRow;
