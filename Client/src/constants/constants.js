const auth = {
  authToken: "authToken",
  authUser: "authUser"
};

const baseUrl = "http://localhost:5000";
const authUrl = `${baseUrl}/auth`;
const bookUrl = `${baseUrl}/book`;

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
  bookDeleteUrl: `${bookUrl}/delete`
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
  storePath: "/store",
  storeName: "Store",
  ordersPath: "/orders",
  ordersName: "My orders",
  detailsPath: "/details",
  detailsName: "Details",
  cartPath: "/cart",
  cartName: "Cart",
  bookCreatePath: "/admin/create",
  bookCreateName: "Create new book",
  ordersPendingPath: "/admin/orders/pending",
  ordersPendingName: "Pending orders",

  // user
  profilePath: "/profile",
  profileName: "profile"
};

const roles = {
  adminRole: "Admin"
};

export { auth, dbConstants, notifications, paths, roles };
