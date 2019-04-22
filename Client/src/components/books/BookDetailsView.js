import React from "react";
import BookDetailsRow from "./BookDetailsRow";
import CustomButton from "../common/CustomButton";
import bookService from "../../services/book-service";
import { toCurrency } from "../../services/helpers";

const BookDetailsView = props => {
  const getBookName = absPath => absPath.split("\\").pop();

  const handleFileDownload = async event => {
    event.preventDefault();

    const { book } = props;

    // Fetch dload file
    const result = await bookService.downloadFileByBookId(book._id);

    // Create blob link to download
    const blob = await result.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", getBookName(book.file));

    // Append dload link to html
    document.body.appendChild(link);

    // Force download
    link.click();

    // Clean up and remove dload link
    link.parentNode.removeChild(link);
  };

  console.log(props);
  const { book, actions, isAdmin, isDelivered } = props;

  if (!book) {
    return;
  }

  const { image, title, description, genres, author, price, likes } = book;
  const isUserAuthenticated = isDelivered || isAdmin();
  const isFileDownloadable = book.file && book.file !== "";

  return (
    <section className="book-details-container row">
      <article className="book-details-article col-lg-3">
        <div className="text-center">
          {image ? <img src={image} alt={title} /> : null}
        </div>
      </article>

      <article className="book-details-article col-lg-9">
        <h1>{title}</h1>
        <BookDetailsRow title="Author" value={author} />
        <BookDetailsRow title="Genres" value={genres} />
        <BookDetailsRow title="Description" value={description} />
        <BookDetailsRow title="Likes" value={likes.length} />
        <BookDetailsRow title="Price" value={toCurrency(price)} />

        {/* Book Download Link for Admins & Buyers with order status Delivered */}
        {isUserAuthenticated && isFileDownloadable ? (
          <BookDetailsRow
            title="E-Book"
            value={
              <CustomButton
                name="Download"
                handleAction={handleFileDownload}
                color="primary"
              />
            }
          />
        ) : null}

        {/* Actions */}
        {actions}
      </article>
    </section>
  );
};

export default BookDetailsView;
