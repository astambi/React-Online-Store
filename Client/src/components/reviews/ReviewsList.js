import React, { Fragment } from "react";
import Review from "./Review";

const BookReviewsView = props => {
  const { reviews } = props;

  return (
    <Fragment>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Review key={index} review={review} index={index + 1} />
        ))
      ) : (
        <h5>No reviews</h5>
      )}
    </Fragment>
  );
};

export default BookReviewsView;
