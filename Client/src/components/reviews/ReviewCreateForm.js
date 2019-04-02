import React from "react";

class ReviewCreateForm extends React.Component {
  render() {
    const { submitReview } = this.props;

    return (
      <form className="review-form">
        <div class="form-group">
          <label for="review">Leave a review</label>
          <textarea class="form-control" id="review" rows="3" />
          <button type="submit" class="btn btn-info" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      </form>
    );
  }
}

export default ReviewCreateForm;
