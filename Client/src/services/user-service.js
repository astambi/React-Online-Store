import { get, post, remove } from "../data/crud";
import bookService from "./book-service";
import { dbConstants } from "../constants/constants";
import orderService from "./order-service";

const getCurrentUserId = async () => {
  const user = await userService.getCurrentUserProfile();
  return user && user !== undefined ? user._id : null;
};

const getCurrentUserUsername = async () => {
  const user = await userService.getCurrentUserProfile();
  return user && user !== undefined ? user.username : null;
};

const getCurrentUserBookLikes = async () => {
  const username = await getCurrentUserUsername();
  if (!username) {
    return null;
  }

  return (await bookService.getAllBooks()).filter(
    b => b.likes.some(l => l) && b.likes.includes(username)
  );
};

const getCurrentUserReviews = async () => {
  const username = await getCurrentUserUsername();
  if (!username) {
    return null;
  }

  return (await bookService.getAllBooks())
    .filter(
      b =>
        b.reviews.some(r => r) && b.reviews.some(r => r.createdBy === username)
    )
    .map(b => ({
      book: b,
      reviews: b.reviews.filter(r => r.createdBy === username)
    }));
};

const getCurrentUserBookFiles = async () => {
  let userProducts = [];
  (await orderService.getUserOrders())
    .filter(o => o.status === "Delivered") // only
    .map(o => (userProducts = userProducts.concat(o.products)));
  const bookIds = [...new Set(userProducts.map(p => p._id))];

  const bookFiles = (await bookService.getAllBooks())
    .filter(b => bookIds.includes(b._id) && b.file)
    .map(b => ({ _id: b._id, title: b.title, image: b.image, file: b.file }));
  console.log(bookFiles);

  return bookFiles;
};

const isCurrentUserBookFile = async id =>
  (await getCurrentUserBookFiles()).some(b => b._id === id);

const userService = {
  getCurrentUserProfile: () => get(dbConstants.userProfileUrl),
  getCurrentUserId: () => getCurrentUserId(),
  getCurrentUserUsername: () => getCurrentUserUsername(),
  getCurrentUserBookFiles: () => getCurrentUserBookFiles(),
  isCurrentUserBookFile: id => isCurrentUserBookFile(id),
  getCurrentUserBookLikes: () => getCurrentUserBookLikes(),
  getCurrentUserReviewsOnBooks: () => getCurrentUserReviews(),
  updateCurrentUser: userData => post(dbConstants.userProfileUrl, userData),
  deleteCurrentUser: () => remove(dbConstants.userProfileUrl)
};

export default userService;
