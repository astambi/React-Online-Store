import React from "react";
import ButtonDecrease from "../common/buttons/ButtonDecrease";
import ButtonIncrease from "../common/buttons/ButtonIncrease";
import ButtonRemove from "../common/buttons/ButtonRemove";
import ButtonUpdate from "../common/buttons/ButtonUpdate";
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
      <ButtonDecrease
        size="sm"
        handleAction={() => handleDecreaseQuantity(book)}
      />
      <ButtonIncrease
        size="sm"
        handleAction={() => handleIncreaseQuantity(book)}
      />
      <ButtonUpdate
        size="sm"
        handleAction={() => handleUpdateBookDetails(book)}
      />
      <ButtonRemove
        size="sm"
        handleAction={() => handleRemoveBookFromCart(book)}
      />
    </ProductTableRow>
  );
};

export default CartTableRow;
