import { get, post } from "../data/crud";
import { dbConstants } from "../constants/constants";

const bookService = {
  getAllBooks: () => get(dbConstants.booksAllUrl),
  createBook: book => post(dbConstants.bookCreateUrl, book),
  likeBookById: id => post(dbConstants.bookLikeByIdUrl + id),
  unlikeBookById: id => post(dbConstants.bookUnlikeByIdUrl + id),
  reviewBookById: (id, review) =>
    post(dbConstants.bookReviewByIdUrl + id, review)
};

export default bookService;
