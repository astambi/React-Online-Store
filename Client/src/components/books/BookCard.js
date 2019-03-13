import React from "react";
import { Link } from "react-router-dom";

const BookCard = props => {
  const { book } = props;

  if (!book) {
    return null;
  }

  const { imageUrl, title, detailsLink, description, id } = book;

  return (
    <div className="card col-4">
      <img className="card-img-top card-image" src={imageUrl} alt={title} />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>

      <div className="card-footer">
        <small className="text-muted" />

        <Link
          to={`/details/${id}`}
          type="button"
          className="btn btn-primary float-right btn-sm"
        >
          Details
        </Link>

        <button type="button" className="btn btn-warning float-right btn-sm">
          Order
        </button>
      </div>
    </div>
  );
};

export default BookCard;
