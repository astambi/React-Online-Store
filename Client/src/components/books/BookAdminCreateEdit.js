import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookForm from "./BookForm";
import bookService from "../../services/book-service";
import notificationService from "../../services/notification-service";
import { handleInputChange } from "../../services/helpers";
import {
  notifications,
  paths,
  notificationMessages
} from "../../constants/constants";

class BookAdminCreateEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdated: false,
      action: "", // create / edit
      btnColor: "",
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

  componentDidMount = async () => {
    const { path } = this.props;

    if (path.includes(paths.bookCreatePath)) {
      this.setState({
        action: "create",
        btnColor: "success"
      });
      return;
    }

    if (path.includes(paths.bookEditPath)) {
      // On Edit load book
      const { id } = this.props.computedMatch.params; // NB

      // Not Found
      if (!(await bookService.existsBookById(id))) {
        notificationService.errorMsg(notificationMessages.bookNotFoundMsg);
        this.setState({ book: null });
        return;
      }

      const book = await bookService.getBookById(id);

      this.setState({
        book,
        action: "edit",
        btnColor: "warning"
      });
    }
  };

  handleChange = event => handleInputChange.bind(this)(event, "book");

  handleSubmit = async event => {
    event.preventDefault();

    // Input Validation
    if (!this.isValidInput()) {
      return;
    }

    // Clear errors
    this.setState({ error: {} });

    try {
      const { book } = this.state;

      // Update book in Db
      const result =
        this.state.action === "create"
          ? await bookService.createBook(book)
          : await bookService.editBookById(book._id, book);

      this.updateState(result);
    } catch (error) {
      console.log(error);
      this.setState({ error });

      // Error Notification
      notificationService.errorMsg(error);
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

  updateState(result) {
    console.log(result);
    const { success, message, errors, data } = result;

    if (!success) {
      this.setState({
        error: { message, errors }
      });

      // Error Notification
      notificationService.errorMsg(message);
    } else {
      this.setState({
        isUpdated: true,
        book: data,
        error: {}
      });

      // Success Notification
      notificationService.successMsg(message);
    }
  }

  render() {
    const { book } = this.state;

    if (!book) {
      return <Redirect to={paths.storePath} />;
    }

    const { isUpdated, ...otherProps } = this.state;

    if (isUpdated) {
      return <Redirect to={`${paths.bookDetailsPath}/${book._id}`} />;
    }

    return (
      <BookForm
        {...otherProps} // book, error, action, btnColor
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default BookAdminCreateEdit;
