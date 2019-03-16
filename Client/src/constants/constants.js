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
  usernameRequired: "Please provide your username"
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

  // user
  profilePath: "/profile",
  profileName: "profile"
};

export { auth, dbConstants, notifications, paths };
