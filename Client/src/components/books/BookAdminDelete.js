import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookForm from "./BookForm";
import bookService from "../../services/book-service";
import { paths } from "../../constants/constants";

class BookDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false,
      error: ""
    };
  }

  handleSubmitDelete = async event => {
    event.preventDefault();

    const { book } = this.props.location.state;

    const result = await bookService.deleteBookById(book._id);
    console.log(result);
    const { success, message } = result;

    if (success) {
      this.setState({
        isDeleted: true,
        error: ""
      });
    } else {
      this.setState({ error: message });
    }
  };

  render() {
    const { book } = this.props.location.state; // from Link
    const { isDeleted, ...otherProps } = this.state;

    if (isDeleted) {
      return <Redirect to={paths.storePath} />;
    }

    return (
      <BookForm
        {...otherProps} // error
        book={book}
        handleChange={() => {}}
        handleSubmit={this.handleSubmitDelete}
        action="delete"
        btnColor="danger"
      />
    );
  }
}

export default BookDelete;
