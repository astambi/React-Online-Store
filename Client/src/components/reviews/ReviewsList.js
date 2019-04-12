import React, { Fragment } from "react";
import ButtonRemove from "../common/ButtonRemove";
import Review from "./Review";

const BookReviewsView = props => {
  const { reviews, handleReviewDelete, isAdmin } = props;

  return (
    <Fragment>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Review key={index} review={review} index={index + 1}>
            {/* Admin delete review */}
            {!isAdmin ? null : (
              <ButtonRemove handleAction={() => handleReviewDelete(index)} />
            )}
          </Review>
        ))
      ) : (
        <h5>No reviews</h5>
      )}
    </Fragment>
  );
};

export default BookReviewsView;
