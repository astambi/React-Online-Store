import React from "react";
import CartTableRow from "./CartTableRow";

const CartTableBody = props => {
  const { books } = props;

  return (
    <tbody>
      {books && books.length !== 0 ? (
        books.map(book => <CartTableRow key={book._id} book={book} />)
      ) : (
        <tr>
          <td colSpan="5">No books in cart</td>
        </tr>
      )}
    </tbody>
  );
};

export default CartTableBody;
