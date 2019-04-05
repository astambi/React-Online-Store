import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookForm from "./BookForm";
import { handleInputChange } from "../../services/helpers";
import { paths } from "../../constants/constants";
import bookService from "../../services/book-service";

class BookEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdited: false,
      book: {},
      error: {
        message: "",
        errors: {}
      }
    };
  }

  componentDidMount = () => {
    const { book } = this.props.location.state; // from Link
    this.setState({ book });
  };

  handleChange = event => handleInputChange.bind(this)(event, "book");

  handleSubmitEdit = async event => {
    event.preventDefault();

    const { book } = this.state;

    const result = await bookService.editBookById(book._id, book);
    console.log(result);

    const { success, message, data, errors } = result;
    if (success) {
      this.setState({
        isEdited: true,
        book: data,
        error: ""
      });
    } else {
      const error = { message, errors };
      this.setState({ error });
    }
  };

  render() {
    const { book, ...otherProps } = this.state; // from Link
    const { isEdited } = this.state;

    if (isEdited) {
      return (
        <Redirect
          to={{
            pathname: `${paths.bookDetailsPath}/${book._id}`,
            state: { book }
          }}
        />
      );
    }

    return (
      <BookForm
        {...otherProps} // error
        book={book}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmitEdit}
        action="edit"
        btnColor="warning"
      />
    );
  }
}

export default BookEdit;
