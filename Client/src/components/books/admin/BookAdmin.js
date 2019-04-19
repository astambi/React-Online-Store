import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookForm from "../BookForm";
import bookService from "../../../services/book-service";
import notificationService from "../../../services/notification-service";
import { handleBlur, handleInputChange } from "../../../services/helpers";
import {
  notifications,
  notificationMessages,
  paths,
  actions
} from "../../../constants/constants";

class BookAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdated: false,
      color: "", // success, danger, warning (text & button)
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
        message: "", // error msg from server
        errors: {} // { name, image, description, price, ... }
      },
      touched: {
        title: false,
        genres: false,
        author: false,
        description: false,
        image: false,
        price: false
      }
    };
  }

  componentDidMount = async () => {
    const { action } = this.props;

    switch (action) {
      case actions.create:
        this.loadCreateForm();
        break;
      case actions.delete:
        await this.loadDeleteForm();
        break;
      case actions.edit:
        await this.loadEditForm();
        break;
      default:
        break;
    }
  };

  findBook = async () => {
    const { id } = this.props;

    // Not Found
    if (!(await bookService.existsBookById(id))) {
      notificationService.errorMsg(notificationMessages.bookNotFoundMsg);

      this.setState({ book: null });
      return null;
    }

    return await bookService.getBookById(id);
  };

  handleBlur = field => handleBlur.bind(this)(field, "touched");

  handleChange = event => {
    handleInputChange.bind(this)(event, "book");
    this.validateInput(); // Validate input on change
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { action } = this.props;

    try {
      const { book } = this.state;
      console.log(book);

      // Update book in Db
      let result = null;
      switch (action) {
        case actions.create:
          result = await bookService.createBook(book);
          break;
        case actions.delete:
          result = await bookService.deleteBookById(book._id);
          break;
        case actions.edit:
          result = await bookService.editBookById(book._id, book);
          break;
        default:
          break;
      }

      this.updateState(result);
    } catch (error) {
      console.log(error);
      this.setState({ error });

      // Error Notification
      notificationService.errorMsg(error);
    }
  };

  loadCreateForm = () => this.setState({ color: "success" });

  loadDeleteForm = async () => {
    const book = await this.findBook();
    this.setState({ book, color: "danger" });
  };

  loadEditForm = async () => {
    const book = await this.findBook();
    this.setState({ book, color: "warning" });
  };

  validateInput() {
    const { book } = this.state;

    let isValid = true;
    const errors = {};

    if (!book.title || book.title.length < 3) {
      isValid = false;
      errors.title = notifications.bookTitleRequired;
    }

    if (!book.genres || book.genres.length === 0) {
      isValid = false;
      errors.genres = notifications.bookGenresRequired;
    }

    if (
      !book.description ||
      book.description.length < 10 ||
      book.description.length > 200
    ) {
      isValid = false;
      errors.description = notifications.bookDescriptionRequired;
    }

    if (
      !book.image ||
      !(
        book.image.startsWith("https://") || book.image.startsWith("http://")
      ) ||
      book.image.length < 14
    ) {
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

    const validationError = { message: isValid ? null : "", errors };
    this.setState({ error: validationError });
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
    const { action } = this.props;
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
        {...otherProps} // color, book, error, touched
        action={action} // create, edit, delete
        disabled={action === actions.delete}
        handleBlur={this.handleBlur}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default BookAdmin;
