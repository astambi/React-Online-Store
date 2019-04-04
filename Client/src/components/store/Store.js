import React, { Component } from "react";
import BookList from "../books/BookList";
import SearchForm from "./SearchForm";
import bookService from "../../services/book-service";
import { handleInputChange, stringContains } from "../../services/helpers";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      books: [],
      search: { query: "" },
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

      this.setState({
        isLoading: false,
        books
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
        error
      });
    }

    return books;
  };

  handleChangeQuery = event => handleInputChange.bind(this)(event, "search");

  handleSubmitQuery = async event => {
    event.preventDefault();

    const { search } = this.state;
    const { query } = search;

    if (!query || query.trim() === "") {
      return;
    }

    const allBooks = await this.getAllBooks();
    const queryBooks = allBooks.filter(
      b =>
        stringContains(b.title, query) ||
        stringContains(b.author, query) ||
        stringContains(b.description, query)
    );
    this.setState({ books: queryBooks, isLoading: false });
  };

  render() {
    const { books, search } = this.state;
    console.log(books);

    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1 className="jumbotron-heading text-center">Store</h1>

            <SearchForm
              search={search}
              onChange={this.handleChangeQuery}
              onSubmit={this.handleSubmitQuery}
            />
          </div>
        </div>

        <BookList books={books} />

        {/* Pagination TODO */}
        <div className="row space-top">
          <div className="col-md-12">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="/store/0">
                  «
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="/store/1">
                  1
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="/store/2">
                  »
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Store;
