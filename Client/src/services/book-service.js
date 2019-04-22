import { get, post, remove, upload, download } from "../data/crud";
import { dbConstants } from "../constants/constants";

const filterAvailableBooks = async books => {
  const booksFromDb = await bookService.getAllBooks();
  const availableBooks = booksFromDb
    .map(b => b._id)
    .filter(id => books.some(b => b._id === id));

  return availableBooks;
};

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
  filterAvailableBooks: books => filterAvailableBooks(books),
  likeBookById: id => post(dbConstants.bookLikeByIdUrl + id),
  unlikeBookById: id => post(dbConstants.bookUnlikeByIdUrl + id),
  reviewBookById: (id, review) =>
    post(dbConstants.bookReviewByIdUrl + id, review),
  deleteBookReviewByIdIndex: (bookId, reviewIndex) =>
    post(dbConstants.bookReviewDeleteByIdIndexUrl + bookId + "/" + reviewIndex),
  uploaFileByBookId: (id, data) =>
    upload(dbConstants.bookFileUploadByIdUrl + id, data),
  downloadFileByBookId: id =>
    download(dbConstants.bookFileDownloadByIdUrl + id),
  deleteFileByBookId: id => post(dbConstants.bookFileDeleteByIdUrl + id),
  getStats: () => get(dbConstants.statsUrl)
};

export default bookService;
