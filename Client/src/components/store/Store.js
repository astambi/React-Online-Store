import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BookList from "../books/BookList";
import bookService from "../../services/book-service";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      books: [],
      error: ""
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const books = await bookService.getAllBooks();
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
  }

  render() {
    const { books } = this.state;
    console.log(books);

    return (
      <div className="container">
        {/* Search */}
        <div className="row space-top">
          <div className="col-md-12">
            <h1 className="jumbotron-heading text-center">Store</h1>

            <form className="form-inline md-form form-sm active-cyan active-cyan-2">
              <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
              <input
                className="form-control form-control-sm ml-3 w-75"
                type="text"
                placeholder="Search for the book you are looking for..."
                aria-label="Search"
                name="query"
                value=""
              />
            </form>
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
