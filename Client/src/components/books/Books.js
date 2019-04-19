import React, { Component } from "react";
import BookList from "./BookList";
import BookSearchForm from "./BookSearchForm";
import Pagination from "../common/Pagination";
import bookService from "../../services/book-service";
import {
  // Input
  handleInputChange,
  // Pagination
  filterCurrentPageItems,
  changePageTo,
  handlePageDecrease,
  handlePageIncrease,
  updatePaginationState,
  // Misc
  stringContains
} from "../../services/helpers";

class Books extends Component {
  constructor(props) {
    super(props);

    this.pageLimit = 8; // pagination

    this.topCount = 10; // top-rated items

    this.state = {
      isLoading: false,
      books: [],
      search: { query: "" },
      pagination: {
        currentPage: 1,
        totalPages: 1
      },
      error: ""
    };
  }

  componentDidMount = async () => await this.getAllBooks();

  getAllBooks = async () => {
    try {
      this.setState({ isLoading: true });
      const allBooks = await bookService.getAllBooks();
      console.log(allBooks);

      const { fromHome } = this.props;

      let topRatedBooks = [];
      if (fromHome) {
        topRatedBooks = allBooks
          .filter(b => b.likes.length > 0)
          .sort((a, b) => b.likes.length - a.likes.length) // desc
          .slice(0, this.topCount);
        console.log(topRatedBooks);
      }

      const books = fromHome ? topRatedBooks : allBooks;

      this.setState({ isLoading: false, books });
      updatePaginationState.bind(this)(books, this.pageLimit); // pagination

      return books;
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, error });
    }
  };

  handleChangeQuery = event => handleInputChange.bind(this)(event, "search");

  handleSubmitQuery = async event => {
    event.preventDefault();

    const { search } = this.state;
    const { query } = search;

    const allBooks = await this.getAllBooks();
    let queryBooks = [...allBooks];

    // Query
    if (query && query.trim() !== "") {
      queryBooks = allBooks.filter(
        b =>
          stringContains(b.title, query) ||
          stringContains(b.author, query) ||
          stringContains(b.description, query)
      );
    }

    this.setState({ isLoading: false, books: queryBooks });
    updatePaginationState.bind(this)(queryBooks, this.pageLimit); // pagination
  };

  render() {
    const { fromStore } = this.props;
    const { isLoading, books, search, pagination } = this.state;

    // Pagination Items
    const booksToDisplay = filterCurrentPageItems(
      books,
      pagination.currentPage,
      this.pageLimit
    );
    console.log(booksToDisplay);

    return (
      <section className={fromStore ? "store" : "top-rated-books mt-3"}>
        <h1 className="jumbotron-heading text-center">
          {fromStore ? "Store" : "Top rated books"}
        </h1>

        {!fromStore ? null : (
          <BookSearchForm
            search={search}
            onChange={this.handleChangeQuery}
            onSubmit={this.handleSubmitQuery}
          />
        )}

        <BookList isLoading={isLoading} books={booksToDisplay} />

        <Pagination
          {...pagination} // currentPage, totalPages
          changePageTo={changePageTo.bind(this)}
          handlePageDecrease={() => handlePageDecrease.bind(this)()}
          handlePageIncrease={() => handlePageIncrease.bind(this)()}
        />
      </section>
    );
  }
}

export default Books;
