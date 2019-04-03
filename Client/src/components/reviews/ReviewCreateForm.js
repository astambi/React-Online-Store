import React from "react";

const ReviewCreateForm = props => {
  const { handleChange, handleSubmit, review } = props;
  const { content } = review;

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="review">Leave a review</label>
        <textarea
          className="form-control"
          rows="2"
          id="review"
          name="content"
          value={content}
          onChange={handleChange}
        />
        <input type="submit" className="btn btn-info" value="Submit review" />
      </div>
    </form>
  );
};

export default ReviewCreateForm;
