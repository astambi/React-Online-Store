import React, { Component, Fragment } from "react";
import BookCard from "./BookCard";
import Loading from "../common/Loading";
import bookService from "../../services/bookService";

class TopRatedBookCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      isLoading: false,
      error: ""
    };

    this.bookService = new bookService();
  }

  async componentDidMount() {
    const books = await this.bookService.getTopRated();

    try {
      this.setState({
        books,
        isLoading: false,
        error: ""
      });

      console.log(this.state);
    } catch (error) {
      console.log(error);

      this.setState({
        isLoading: false,
        error
      });
    }
  }

  render() {
    const { books, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    if (!isLoading && !books.length) {
      return <h2>No books found</h2>;
    }

    return (
      <Fragment>
        <h2>Top Rated</h2>

        <div className="row">
          <div className="card-deck space-top">
            {books.map(book => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TopRatedBookCards;
