import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../constants/constants";

const UserBookReviews = props => {
  const { book, reviews } = props;

  return (
    <article className="books-with-reviews row">
      <div className="col-md-3 mt-3">
        <Link to={paths.bookDetailsPath + "/" + book._id}>
          <img src={book.image} alt={book.title} />
        </Link>
      </div>

      <div className="col-md-9 mt-3">
        <h5>{book.title}</h5>
        <ul>
          {reviews.map(review => (
            <li key={book._id + review.review}>{review.review}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default UserBookReviews;
