import React, { Component } from "react";
import BookList from "../books/BookList";
import SearchForm from "./SearchForm";
import bookService from "../../services/book-service";
import {
  filterCurrentPageItems,
  handleInputChange,
  handlePageDecrease,
  handlePageIncrease,
  stringContains,
  updatePaginationState
} from "../../services/helpers";

class Store extends Component {
  constructor(props) {
    super(props);

    this.pageLimit = 8;

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
    this.setState({ isLoading: true });

    let books = [];
    try {
      books = await bookService.getAllBooks();
      console.log(books);

      this.setState({ isLoading: false, books });
      updatePaginationState.bind(this)(books, this.pageLimit);
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, error });
    }

    return books;
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
    updatePaginationState.bind(this)(queryBooks, this.pageLimit);
  };

  render() {
    const { books, search, pagination } = this.state;

    const booksToDisplay = filterCurrentPageItems(
      books,
      pagination.currentPage,
      this.pageLimit
    );
    console.log(booksToDisplay);

    return (
      <section className="store">
        <h1 className="jumbotron-heading text-center">Store</h1>

        <SearchForm
          search={search}
          onChange={this.handleChangeQuery}
          onSubmit={this.handleSubmitQuery}
        />

        <BookList
          books={booksToDisplay}
          {...pagination} // currentPage, totalPages
          handlePageDecrease={() => handlePageDecrease.bind(this)()}
          handlePageIncrease={() => handlePageIncrease.bind(this)()}
        />
      </section>
    );
  }
}

export default Store;
