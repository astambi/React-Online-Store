import React, { Fragment } from "react";
import ButtonLike from "../common/ButtonLike";
import ButtonOrder from "../common/ButtonOrder";
import ButtonReviews from "../common/ButtonReviews";
import ButtonUnlike from "../common/ButtonUnlike";

const BookUserLinks = props => {
  const {
    isLiked,
    handleLike,
    handleUnlike,
    handleOrderBook,
    handleReviewsVisibility,
    reviewsCount
  } = props;

  return (
    <Fragment>
      <ButtonLike
        className="mt-1 mb-1"
        outline={!isLiked} // display liked button css if book is liked
        handleAction={handleLike}
      />
      <ButtonUnlike className="mt-1 mb-1" handleAction={handleUnlike} />
      <ButtonReviews
        className="mt-1 mb-1"
        handleAction={handleReviewsVisibility}
        name={`Reviews (${reviewsCount})`}
      />
      <ButtonOrder className="mt-1 mb-1" handleAction={handleOrderBook} />
    </Fragment>
  );
};

export default BookUserLinks;
