import React, { Component } from "react";
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

    const topCount = 10;

    try {
      const allBooks = await bookService.getAllBooks();
      const topRatedBooks = allBooks
        .filter(b => b.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length) // desc
        .slice(0, topCount);
      console.log(topRatedBooks);

      this.setState({ isLoading: false, books: topRatedBooks });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, error });
    }
  };

  render() {
    const { books, isLoading } = this.state;

    // Loading
    if (isLoading) {
      return <Loading />;
    }

    return (
      <section className="top-rated-books mt-3">
        <h2 className="text-center">Top Rated Books</h2>
        <BookList books={books} />
      </section>
    );
  }
}

export default TopRatedBookCards;
