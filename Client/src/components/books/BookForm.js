import React from "react";
import Error from "../common/Error";
import Input from "../common/Input";
import InputSubmit from "../common/InputSubmit";

const BookForm = props => {
  const {
    handleChange,
    handleSubmit,
    book,
    error,
    action,
    color,
    disabled
  } = props;
  const { title, genres, description, image, author, price } = book;
  const { message, errors } = error;

  return (
    <section className="form-container container col-lg-8 col-xl-6">
      <h1 className="text-capitalize">{action} book</h1>

      <form onSubmit={handleSubmit}>
        {message ? <Error notification={message} /> : null}

        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter book title"
          value={title}
          disabled={disabled}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="text"
          name="genres"
          id="genres"
          placeholder="Enter genres for the book. Put a comma between them"
          value={genres}
          disabled={disabled}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Enter book description"
          value={description}
          disabled={disabled}
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
          disabled={disabled}
          onChange={handleChange}
          errors={errors}
        />

        <div className="image-container text-center">
          <img src={image} alt={title} />
        </div>

        <Input
          type="text"
          name="author"
          id="author"
          placeholder="Enter book author"
          value={author}
          disabled={disabled}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="number"
          name="price"
          id="price"
          placeholder="Enter book price"
          min="0"
          step="1"
          value={price}
          disabled={disabled}
          onChange={handleChange}
          errors={errors}
        />

        <InputSubmit value={action} color={color} />
      </form>
    </section>
  );
};

export default BookForm;
