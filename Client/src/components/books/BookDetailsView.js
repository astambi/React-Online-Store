import React from "react";
import BookDetailsRow from "./BookDetailsRow";
import { toCurrency } from "../../services/helpers";

const BookDetailsView = props => {
  const { book, actions } = props;
  const { image, title, description, genres, author, price, likes } = book;

  console.log(book);

  return (
    <section className="book-details-container row">
      <article className="book-details-article col-lg-3">
        <div className="text-center">
          <img src={image} alt={title} />
        </div>
      </article>

      <article className="book-details-article col-lg-9">
        <h1>{title}</h1>
        <BookDetailsRow title="Author" value={author} />
        <BookDetailsRow title="Genres" value={genres} />
        <BookDetailsRow title="Description" value={description} />
        <BookDetailsRow title="Likes" value={likes.length} />
        <BookDetailsRow title="Price" value={toCurrency(price)} />

        {/* Actions */}
        {actions}
      </article>
    </section>
  );
};

export default BookDetailsView;
