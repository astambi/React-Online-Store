import React from "react";
import ButtonRemove from "../common/ButtonRemove";
import Review from "./Review";

const BookReviewsView = props => {
  const { reviews, handleReviewDelete, isAdmin, username } = props;

  return reviews && reviews.length > 0 ? (
    reviews.map((review, index) => (
      <Review key={index} review={review} index={index + 1}>
        {/* Admin or review Author Delete review */}
        {!isAdmin && review.createdBy !== username ? null : (
          <ButtonRemove handleAction={() => handleReviewDelete(index)} />
        )}
      </Review>
    ))
  ) : (
    <h5>No reviews</h5>
  );
};

export default BookReviewsView;
