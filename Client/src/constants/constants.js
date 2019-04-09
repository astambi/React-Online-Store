const auth = {
  authToken: "authToken",
  authUser: "authUser"
};

const baseUrl = "http://localhost:5000";
const authUrl = `${baseUrl}/auth`;
const bookUrl = `${baseUrl}/book`;
const ordersUrl = `${baseUrl}/orders`;

const dbConstants = {
  // auth
  loginUrl: `${authUrl}/login`,
  logoutUrl: `${authUrl}/logout`,
  registerUrl: `${authUrl}/signup`,
  // books
  bookCreateUrl: `${bookUrl}/create`,
  booksAllUrl: `${bookUrl}/all`,
  bookReviewByIdUrl: `${bookUrl}/review/`,
  bookLikeByIdUrl: `${bookUrl}/like/`,
  bookUnlikeByIdUrl: `${bookUrl}/unlike/`,
  bookDeleteByIdUrl: `${bookUrl}/delete/`,
  bookEditByIdUrl: `${bookUrl}/edit/`,
  // orders
  orderCreateUrl: `${ordersUrl}/submit`,
  orderApproveByIdUrl: `${ordersUrl}/approve/`,
  orderDeliverByIdUrl: `${ordersUrl}/deliver/`,
  ordersByUserUrl: `${ordersUrl}/user`,
  ordersAllUrl: `${ordersUrl}/all`,
  ordersApprovedUrl: `${ordersUrl}/approved`,
  ordersDeliveredUrl: `${ordersUrl}/delivered`,
  ordersPendingUrl: `${ordersUrl}/pending`
};

// Input notifications
const notifications = {
  welcomeMsg: "Welcome to our book store",
  goToHome: "Go to home",
  goToStore: "Go to store",
  viewOrders: "View your orders",
  notFound: "Page not found",
  credentialsRequired: "Please provide credentials",
  emailRequired: "Please provide your email address",
  passwordRequired: "Please provide your password",
  passwordsDoNotMatch: "Passwords do not match",
  usernameRequired: "Please provide your username",
  bookTitleRequired: "Please provide book title",
  bookAuthorRequired: "Please provide book author",
  bookGenresRequired: "Please provide book genres",
  bookImageRequired: "Please provide book image URL",
  bookPriceRequired: "Please provide valid book price",
  bookDescriptionRequired: "Please provide book description",
  bookDataRequired: "Please provide book data"
};

const notificationMessages = {
  // Auth
  loginRequiredMsg: "Please login to continue",
  logoutSuccessMsg: "You have successfully logged out",
  // Books
  bookCreatedMsg: "Book created",
  bookDeletedMsg: "Book deleted",
  bookEditedMsg: "Book updated",
  bookLikeddMsg: "Book liked",
  bookUnlikeddMsg: "Book unliked",
  bookAddedToCartMsg: "Book added to cart",
  bookRemovedFromCartMsg: "Book removed from cart",
  bookInfoUpdatedMsg: "Book info & price updated",
  bookQuantityUpdatedMsg: "Book quantity updated",
  bookNotFoundMsg: "Book not found",
  // Cart
  cartEmptyMsg: "Cart is empty",
  cartUpdatedMsg: "Cart updated",
  // Orders
  orderCreateMsg: "Order created",
  orderApprovedMsg: "Order approved",
  orderNotFoundMsg: "Order not found",
  // Reviews
  reviewCreatedMsg: "Review added",
  // Invalid
  invalidInput: "Invalid input",
  notFoundMsg: "Not found",
  errorMsg: "Something went wrong. Please try again"
};

const paths = {
  // auth
  registerPath: "/signup",
  registerName: "Register",
  loginPath: "/login",
  loginName: "Login",
  logoutPath: "/logout",
  logoutName: "Logout",
  // home
  indexPath: "/",
  indexName: "Book store",
  homePath: "/home",
  homeName: "Home",
  // books
  bookDetailsPath: "/books/details",
  bookDetailsName: "Details",
  storePath: "/store",
  storeName: "Store",
  // cart
  cartPath: "/cart",
  cartName: "Cart",
  // orders
  ordersPath: "/orders",
  ordersName: "My orders",
  orderDetailsPath: "/orders/details",
  orderDetailsName: "View",
  // admin
  bookCreatePath: "/admin/create",
  bookCreateName: "Create",
  bookEditPath: "/admin/edit",
  bookEditName: "Edit book",
  bookDeletePath: "/admin/delete",
  bookDeleteName: "Delete book",
  ordersAllPath: "/admin/orders/all",
  ordersApprovedPath: "/admin/orders/approved",
  ordersApprovedName: "Approved",
  ordersDeliveredPath: "/admin/orders/delivered",
  ordersDeliveredName: "Delivered",
  ordersPendingPath: "/admin/orders/pending",
  ordersPendingName: "Pending",
  orderDetailsAdminPath: "/admin/orders/details",
  // user
  profilePath: "/profile",
  profileName: "Profile"
};

const roles = {
  adminRole: "Admin"
};

export { auth, dbConstants, notifications, notificationMessages, paths, roles };
