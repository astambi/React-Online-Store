import { get } from "../data/crud";

class BookService {
  constructor() {
    this.baseUrl = `http://localhost:5000/book/`;
    this.allBooksUrl = `${this.baseUrl}all`;
  }

  getTopRated() {
    return get(this.allBooksUrl);
  }
}

export default BookService;
