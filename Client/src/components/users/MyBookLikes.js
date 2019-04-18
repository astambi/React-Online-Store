import React, { Component } from "react";
import BookList from "../books/BookList";
import ProfileSection from "./ProfileSection";
import userService from "../../services/user-service";

class MyBookLikes extends Component {
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
      books: await userService.getCurrentUserBookLikes()
    });
  };

  render() {
    const { books, ...otherProps } = this.state;

    return (
      <ProfileSection
        {...otherProps} // isLoading
        title={`My favourite books (${books.length})`}
      >
        <BookList books={books} />
      </ProfileSection>
    );
  }
}

export default MyBookLikes;
