import React from "react";
import Error from "../common/Error";

const BookForm = props => {
  const { handleChange, handleSubmit, book, error, action, btnColor } = props;
  const { title, genres, description, image, author, price } = book;
  const { message, errors } = error;

  return (
    <div className="form-wrapper">
      <h1 className="text-capitalize">{action} book</h1>

      <form onSubmit={handleSubmit}>
        {message ? <Error notification={message} /> : null}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter book title"
            value={title}
            onChange={handleChange}
          />
          {errors && errors.name ? <Error notification={errors.name} /> : null}
        </div>

        <div className="form-group">
          <label htmlFor="genres">Genres</label>
          <input
            type="text"
            name="genres"
            id="genres"
            placeholder="Enter genres for the book. Put a comma between them"
            value={genres}
            onChange={handleChange}
          />
          {errors && errors.genres ? (
            <Error notification={errors.genres} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter book description"
            value={description}
            onChange={handleChange}
          />
          {errors && errors.description ? (
            <Error notification={errors.description} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Enter book image URL"
            value={image}
            onChange={handleChange}
          />
          {errors && errors.image ? (
            <Error notification={errors.image} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Enter book author"
            value={author}
            onChange={handleChange}
          />
          {errors && errors.author ? (
            <Error notification={errors.author} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter book price"
            // min="0.00" //
            step="1" //
            value={price}
            onChange={handleChange}
          />
          {errors && errors.price ? (
            <Error notification={errors.price} />
          ) : null}
        </div>

        <input
          type="submit"
          value={action}
          className={`btn btn-outline-${btnColor} border-${btnColor} text-capitalize`}
        />
      </form>
    </div>
  );
};

export default BookForm;
