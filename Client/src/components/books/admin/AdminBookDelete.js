import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookForm from "../BookForm";
import bookService from "../../../services/book-service";
import notificationService from "../../../services/notification-service";
import { paths, notificationMessages } from "../../../constants/constants";

class AdminBookDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null,
      isDeleted: false,
      error: ""
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    const { id } = this.props.computedMatch.params; // NB

    if (!(await bookService.existsBookById(id))) {
      notificationService.errorMsg(notificationMessages.bookNotFoundMsg);
      this.setState({ isDeleted: true });
      return;
    }

    const book = await bookService.getBookById(id);
    this.setState({ book });
  };

  handleSubmitDelete = async event => {
    event.preventDefault();

    // const { book } = this.props.location.state;
    const { book } = this.state;

    const result = await bookService.deleteBookById(book._id);
    console.log(result);
    const { success, message } = result;

    if (success) {
      this.setState({
        isDeleted: true,
        error: ""
      });

      // Success Notification
      notificationService.successMsg(message);
    } else {
      this.setState({ error: message });

      // Error Notification
      notificationService.errorMsg(message);
    }
  };

  render() {
    const { isDeleted, ...otherProps } = this.state;

    if (isDeleted) {
      return <Redirect to={paths.storePath} />;
    }

    const { book } = this.state;
    if (!book) {
      return null;
    }

    return (
      <BookForm
        {...otherProps} // error
        book={book}
        handleChange={() => {}}
        handleSubmit={this.handleSubmitDelete}
        action="delete"
        color="danger"
        disabled={true}
      />
    );
  }
}

export default AdminBookDelete;
