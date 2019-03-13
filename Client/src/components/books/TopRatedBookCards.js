import React, { Component, Fragment } from "react";
import BookCard from "./BookCard";
import Loading from "../common/Loading";
import bookService from "../../services/book-service";

class TopRatedBookCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false,
      error: ""
    };
  }

  static bookService = new bookService(); // static service

  async componentDidMount() {
    // this.setState({ isLoading: true });

    try {
      const books = await TopRatedBookCards.bookService.getTopRatedBooks();
      this.setState({
        books,
        isLoading: false
      });

      console.log(this.state.books);
    } catch (error) {
      console.log(error);

      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    const { books, isLoading } = this.state;

    // Loading
    if (isLoading) {
      return <Loading />;
    }

    // No books
    if (!isLoading && !books && !books.length) {
      return <h2>No books found</h2>;
    }

    // Book Cards
    const bookCards = books.map(book => <BookCard key={book.id} {...book} />);

    return (
      <Fragment>
        <h2>Top Rated</h2>
        <div className="row">
          <div className="card-deck space-top">{bookCards}</div>
        </div>
      </Fragment>
    );
  }
}

export default TopRatedBookCards;
