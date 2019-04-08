import { get, post, remove } from "../data/crud";
import { dbConstants } from "../constants/constants";

const getBookById = async id => {
  const books = await bookService.getAllBooks();
  return books.find(b => b._id === id);
};

const existsBookById = async id => (await getBookById(id)) !== undefined;

const bookService = {
  getAllBooks: () => get(dbConstants.booksAllUrl),
  getBookById: id => getBookById(id),
  createBook: book => post(dbConstants.bookCreateUrl, book),
  deleteBookById: id => remove(dbConstants.bookDeleteByIdUrl + id),
  editBookById: (id, book) => post(dbConstants.bookEditByIdUrl + id, book),
  existsBookById: id => existsBookById(id),
  likeBookById: id => post(dbConstants.bookLikeByIdUrl + id),
  unlikeBookById: id => post(dbConstants.bookUnlikeByIdUrl + id),
  reviewBookById: (id, review) =>
    post(dbConstants.bookReviewByIdUrl + id, review)
};

export default bookService;
