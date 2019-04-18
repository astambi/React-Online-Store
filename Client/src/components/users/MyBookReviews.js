import React, { Component } from "react";
import ProfileSection from "./ProfileSection";
import UserBookReviews from "../reviews/UserBookReviews";
import userService from "../../services/user-service";

class MyBookReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      bookReviews: []
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    this.setState({
      isLoading: false,
      bookReviews: await userService.getCurrentUserReviewsOnBooks()
    });
  };

  render() {
    const { bookReviews, ...otherProps } = this.state;

    let bookReviewsCount = 0;
    bookReviews.map(br => (bookReviewsCount += br.reviews.length));

    return (
      <ProfileSection
        {...otherProps} // isLoading
        title={`My reviews (${bookReviewsCount})`}
      >
        {bookReviewsCount === 0 ? (
          <h3>No reviews found</h3>
        ) : (
          bookReviews.map(br => (
            <UserBookReviews
              key={br.book._id}
              book={br.book}
              reviews={br.reviews}
            />
          ))
        )}
      </ProfileSection>
    );
  }
}

export default MyBookReviews;
