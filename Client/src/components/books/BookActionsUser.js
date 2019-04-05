import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faShoppingCart,
  faThumbsUp,
  faThumbsDown
} from "@fortawesome/free-solid-svg-icons";

const BookActionsUser = props => {
  const {
    handleLike,
    handleUnlike,
    handleOrderBook,
    handleReviewsVisibility,
    reviewsCount
  } = props;

  return (
    <Fragment>
      <button
        className="btn btn-outline-primary book-details-btn"
        type="button"
        onClick={handleLike}
      >
        <FontAwesomeIcon icon={faThumbsUp} /> Like
      </button>

      <button
        className="btn btn-outline-danger book-details-btn"
        type="button"
        onClick={handleUnlike}
      >
        <FontAwesomeIcon icon={faThumbsDown} /> Unlike
      </button>

      <button
        className="btn btn-outline-info book-details-btn"
        type="button"
        onClick={handleReviewsVisibility}
      >
        <FontAwesomeIcon icon={faComments} /> Reviews ({reviewsCount})
      </button>

      <button
        className="btn btn-outline-warning book-details-btn"
        type="button"
        onClick={handleOrderBook}
      >
        <FontAwesomeIcon icon={faShoppingCart} /> Order
      </button>
    </Fragment>
  );
};

export default BookActionsUser;
