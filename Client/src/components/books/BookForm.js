import React from "react";
import Error from "../common/Error";
import Input from "../common/Input";

const BookForm = props => {
  const { handleChange, handleSubmit, book, error, action, btnColor } = props;
  const { title, genres, description, image, author, price } = book;
  const { message, errors } = error;

  return (
    <div className="form-wrapper">
      <h1 className="text-capitalize">{action} book</h1>

      <form onSubmit={handleSubmit}>
        {message ? <Error notification={message} /> : null}

        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter book title"
          value={title}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="text"
          name="genres"
          id="genres"
          placeholder="Enter genres for the book. Put a comma between them"
          value={genres}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Enter book description"
          value={description}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="text"
          name="image"
          id="image"
          label="Image URL"
          placeholder="Enter book image URL"
          value={image}
          onChange={handleChange}
          errors={errors}
        />
        <img src={image} alt={title} />

        <Input
          type="text"
          name="author"
          id="author"
          placeholder="Enter book author"
          value={author}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Enter book price"
          min="0.00"
          step="1"
          value={price}
          onChange={handleChange}
          errors={errors}
        />

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
