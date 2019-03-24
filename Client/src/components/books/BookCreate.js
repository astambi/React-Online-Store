import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookCreateForm from "./BookCreateForm";
import bookService from "../../services/book-service";
import { handleInputChange } from "../../services/helpers";
import { notifications, paths } from "../../constants/constants";

class BookCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreated: false,
      book: {
        title: "",
        genres: "",
        author: "",
        description: "",
        image: "",
        price: 0,
        likes: [],
        reviews: []
      },
      error: {
        message: "",
        errors: {} // { name, image, description, price, ... }
      }
    };
  }

  handleChange = event => handleInputChange.bind(this)(event, "book");

  handleSubmit = async event => {
    event.preventDefault();

    // Input Validation
    if (!this.isValidInput()) {
      return;
    }

    // Clear errors
    this.setState({ error: {} });

    // Create in Db
    await this.createBook();
  };

  createBook = async () => {
    const { book } = this.state;

    try {
      const response = await bookService.createBook(book);
      console.log(response);

      const { success, message, errors } = response;

      if (!success) {
        this.setState({
          error: { message, errors }
        });
      } else {
        // Created
        this.setState({
          isCreated: true,
          error: {}
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error });
    }
  };

  isValidInput() {
    const { book } = this.state;

    let isValid = true;
    const errors = {};

    if (!book.title) {
      isValid = false;
      errors.name = notifications.bookTitleRequired;
    }

    if (!book.genres) {
      isValid = false;
      errors.genres = notifications.bookGenresRequired;
    }

    if (!book.description) {
      isValid = false;
      errors.description = notifications.bookDescriptionRequired;
    }

    if (!book.image) {
      isValid = false;
      errors.image = notifications.bookImageRequired;
    }

    if (!book.author) {
      isValid = false;
      errors.author = notifications.bookAuthorRequired;
    }

    if (!book.price || book.price < 0) {
      isValid = false;
      errors.price = notifications.bookPriceRequired;
    }

    if (!isValid) {
      const message = notifications.bookDataRequired;
      const validationError = { message, errors };

      this.setState({ error: validationError });
    }

    return isValid;
  }

  render() {
    const { isCreated, ...otherProps } = this.state;

    if (isCreated) {
      return <Redirect to={paths.indexPath} />;
    }

    return (
      <BookCreateForm
        {...otherProps} // book, error
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default BookCreate;
