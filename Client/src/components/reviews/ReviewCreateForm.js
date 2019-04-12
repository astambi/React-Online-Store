import React from "react";
import InputSubmit from "../common/InputSubmit";
import Textarea from "../common/Textarea";

const ReviewCreateForm = props => {
  const { handleChange, handleSubmit, review, error } = props;
  const { content } = review;

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        // rows="2"
        id="review"
        name="content"
        value={content}
        label="Leave a review"
        onChange={handleChange}
        error={error}
      />

      <InputSubmit value="Submit review" color="primary" size="" />
    </form>
  );
};

export default ReviewCreateForm;
