import React from "react";

const BookCardView = props => {
  const { book, children } = props;

  // console.log(book);
  if (!book) {
    return null;
  }

  const { image, title, description } = book;

  return (
    <div className="card book-card col-sm-6 col-md-6 col-lg-3">
      <img className="card-img-top card-image" src={image} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>

      <div className="card-footer bg-transparent row justify-content-around">
        {children}
      </div>
    </div>
  );
};

export default BookCardView;
