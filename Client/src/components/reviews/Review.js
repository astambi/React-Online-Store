import React from "react";

const Review = props => {
  const { review, index, children } = props;

  if (!review) {
    return null;
  }

  const { createdBy, review: content } = review;

  return (
    <article className="review">
      <div className="text-info">
        {children} #{index}
        <span className="text-capitalize"> by {createdBy}:</span>
      </div>
      <p>{content}</p>
    </article>
  );
};

export default Review;
