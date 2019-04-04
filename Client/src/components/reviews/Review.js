import React from "react";

const Review = props => {
  const { review, index } = props;

  if (!review) {
    return null;
  }

  const { createdBy, review: content } = review;

  return (
    <article className="review">
      <div className="text-info">
        #{index} by <span className="text-capitalize">{createdBy}:</span>
      </div>
      {content}
    </article>
  );
};

export default Review;
