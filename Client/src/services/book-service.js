import { get, post } from "../data/crud";
import { dbConstants } from "../constants/constants";

const bookService = {
  getTopRatedBooks: () => get(dbConstants.booksAllUrl),
  createBook: book => post(dbConstants.bookCreateUrl, book)
};

export default bookService;
