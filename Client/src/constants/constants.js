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
  bookReviewUrl: `${bookUrl}/review`,
  bookLikeUrl: `${bookUrl}/like`,
  bookUnlikeUrl: `${bookUrl}/unlike`,
  bookDeleteUrl: `${bookUrl}/delete`,
  // orders
  orderCreateUrl: `${ordersUrl}/submit`,
  ordersByUserUrl: `${ordersUrl}/user`
};

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
  bookCreateName: "Create new book",
  ordersPendingPath: "/admin/orders/pending",
  ordersPendingName: "Pending orders",
  // user
  profilePath: "/profile",
  profileName: "Profile"
};

const roles = {
  adminRole: "Admin"
};

export { auth, dbConstants, notifications, paths, roles };
