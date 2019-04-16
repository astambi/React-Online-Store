import React from "react";
import Input from "../common/Input";
import InputError from "../common/InputError";
import InputSubmit from "../common/InputSubmit";

const BookForm = props => {
  const {
    action,
    book,
    error,
    handleSubmit,
    ...otherProps // handleChange, handleBlur, touched, disabled, color
  } = props;
  const { color } = props;

  const { title, genres, description, image, author, price } = book;
  const { message, errors } = error;

  const inputProps = { ...otherProps, errors, message };

  return (
    <section className="form-container container col-md-8 col-lg-7 col-xl-6">
      <h1 className={`text-capitalize text-${color}`}>{action} book</h1>

      <form onSubmit={handleSubmit}>
        {message ? <InputError notification={message} /> : null}

        <Input
          {...inputProps}
          type="text"
          minLength="3"
          name="title"
          id="title"
          placeholder="Enter book title"
          value={title}
        />

        <Input
          {...inputProps}
          type="text"
          name="genres"
          id="genres"
          placeholder="Enter genres for the book. Put a comma between them"
          value={genres}
        />

        <Input
          {...inputProps}
          type="text"
          name="description"
          id="description"
          placeholder="Enter book description"
          value={description}
        />

        <Input
          {...inputProps}
          type="text"
          name="image"
          id="image"
          label="Image URL"
          placeholder="Enter book image URL"
          value={image}
        />

        {!image ? null : (
          <div className="image-container text-center">
            <img src={image} alt={""} />
          </div>
        )}

        <Input
          {...inputProps}
          type="text"
          name="author"
          id="author"
          placeholder="Enter book author"
          value={author}
        />

        <Input
          {...inputProps}
          type="number"
          min="0"
          step="0.10"
          name="price"
          id="price"
          placeholder="Enter book price"
          value={price}
        />

        <InputSubmit value={action} color={color} />
      </form>
    </section>
  );
};

export default BookForm;
