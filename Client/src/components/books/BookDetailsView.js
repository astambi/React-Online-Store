import React from "react";
import { toCurrency } from "../../services/helpers";

const BookDetailsView = props => {
  const { book, actions } = props;
  const { image, title, description, genres, author, price, likes } = book;

  return (
    <section className="book-details-container row">
      <article className="book-details-article col-lg-3">
        <div className="text-center">
          <img src={image} alt={title} />
        </div>
      </article>
      <article className="book-details-article col-lg-9">
        <h1>{title}</h1>
        <div className="book-details-line">
          <span className="book-details-title">Author: </span>
          {author}
        </div>
        <div className="book-details-line">
          <span className="book-details-title">Genres: </span>
          {genres}
        </div>
        <div className="book-details-line">
          <span className="book-details-title">Description: </span>
          {description}
        </div>
        <div className="book-details-line">
          <span className="book-details-title">Likes: </span>
          {likes.length}
        </div>
        <div className="book-details-line">
          <span className="book-details-title">Price: </span>
          {toCurrency(price)}
        </div>

        {/* Actions */}
        <div className="book-details-button-group">{actions}</div>
      </article>
    </section>
  );
};

export default BookDetailsView;
