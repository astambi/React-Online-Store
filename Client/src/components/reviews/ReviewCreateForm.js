import React from "react";

class ReviewCreateForm extends React.Component {
  render() {
    const { handleChange, handleSubmit } = this.props;

    return (
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="review">Leave a review</label>
          <textarea
            onChange={handleChange}
            className="form-control"
            id="review"
            rows="3"
          />
          <input type="submit" className="btn btn-info" value="Submit review" />
        </div>
      </form>
    );
  }
}

export default ReviewCreateForm;
