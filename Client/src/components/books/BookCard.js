import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../constants/constants";

const BookCard = props => {
  const { _id, description, image, title } = props;

  return (
    <div className="card col-4">
      <img className="card-img-top card-image" src={image} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`${paths.detailsPath}/${_id}`}
          type="button"
          className="btn btn-primary float-right btn-sm"
        >
          {paths.detailsName}
        </Link>
        <button type="button" className="btn btn-warning float-right btn-sm">
          Order
        </button>
      </div>
    </div>
  );
};

export default BookCard;
