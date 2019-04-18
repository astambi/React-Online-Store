import { get, post, remove } from "../data/crud";
import bookService from "./book-service";
import { dbConstants } from "../constants/constants";

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

const userService = {
  getCurrentUserProfile: () => get(dbConstants.userProfileUrl),
  getCurrentUserId: () => getCurrentUserId(),
  getCurrentUserUsername: () => getCurrentUserUsername(),
  getCurrentUserBookLikes: () => getCurrentUserBookLikes(),
  getCurrentUserReviewsOnBooks: () => getCurrentUserReviews(),
  updateCurrentUser: userData => post(dbConstants.userProfileUrl, userData),
  deleteCurrentUser: () => remove(dbConstants.userProfileUrl)
};

export default userService;
