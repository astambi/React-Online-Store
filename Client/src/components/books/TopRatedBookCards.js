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

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    try {
      const allBooks = await bookService.getAllBooks();
      const topRatedBooks = allBooks
        .filter(b => b.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length) // desc
        .slice(0, 3);
      console.log(topRatedBooks);

      this.setState({
        isLoading: false,
        books: topRatedBooks
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
        error
      });
    }
  };

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
