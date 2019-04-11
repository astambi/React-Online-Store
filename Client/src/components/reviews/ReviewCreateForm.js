import React from "react";
import Textarea from "../common/Textarea";

const ReviewCreateForm = props => {
  const { handleChange, handleSubmit, review, error } = props;
  const { content } = review;

  return (
    <article className="review">
      <form className="review-form" onSubmit={handleSubmit}>
        <Textarea
          // rows="2"
          id="review"
          name="content"
          value={content}
          label="Leave a review"
          onChange={handleChange}
          error={error}
        />

        <input
          type="submit"
          className="btn btn-info btn-block"
          value="Submit review"
        />
      </form>
    </article>
  );
};

export default ReviewCreateForm;
