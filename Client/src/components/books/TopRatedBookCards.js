import React, { Component, Fragment } from "react";
import BookList from "./BookList";
import Loading from "../common/Loading";
import bookService from "../../services/book-service";

class TopRatedBookCards extends Component {
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
      const books = await bookService.getTopRatedBooks();
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
    const { books, isLoading } = this.state;

    // Loading
    if (isLoading) {
      return <Loading />;
    }

    return (
      <Fragment>
        <h2>Top Rated</h2>
        <BookList books={books} />
      </Fragment>
    );
  }
}

export default TopRatedBookCards;
