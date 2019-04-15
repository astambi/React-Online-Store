import React, { Component } from "react";
import CartTableRow from "./CartTableRow";
import bookService from "../../services/book-service";

class CartTableBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      availableBooks: []
    };
  }

  componentDidMount = async () => {
    const { books } = this.props;
    const availableBooks = await bookService.filterAvailableBooks(books);
    this.setState({ availableBooks, isLoaded: true });
  };

  render() {
    const { books, ...handleClickActions } = this.props;

    const { availableBooks } = this.state;

    return (
      <tbody>
        {books && books.length !== 0 ? (
          books.map(book => (
            <CartTableRow
              key={book._id}
              book={book}
              isAvailable={availableBooks.includes(book._id)}
              {...handleClickActions}
            />
          ))
        ) : (
          <tr>
            <td colSpan="5">No books in cart</td>
          </tr>
        )}
      </tbody>
    );
  }
}

export default CartTableBody;
