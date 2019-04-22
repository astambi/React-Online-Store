import React, { Component } from "react";
import BookList from "../books/BookList";
import ProfileSection from "./ProfileSection";
import userService from "../../services/user-service";

class MyBookFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      books: []
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      books: await userService.getCurrentUserBookFiles()
    });
  };

  render() {
    const { books, ...otherProps } = this.state;
    console.log(books);

    return (
      <ProfileSection
        {...otherProps} // isLoading
        title={`My e-books (${books.length})`}
      >
        {<BookList books={books} />}
      </ProfileSection>
    );
  }
}

export default MyBookFiles;
