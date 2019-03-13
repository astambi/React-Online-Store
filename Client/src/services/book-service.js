import { get } from "../data/crud";
import { dbConstants } from "../constants/constants";

class BookService {
  getTopRatedBooks = () => get(dbConstants.booksAllUrl);
}

export default BookService;
