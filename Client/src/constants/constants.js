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
  credentialsRequired: "Please provide credentials",
  emailRequired: "Please provide your email address",
  passwordRequired: "Please provide your password",
  passwordsDoNotMatch: "Passwords do not match",
  usernameRequired: "Please provide your username"
};

const paths = {
  // auth
  register: "/signup",
  login: "/login",
  logout: "/logout",
  // home
  index: "/",
  home: "/home",
  // books
  store: "/store",
  orders: "/orders",
  cart: "/cart",
  details: "/details"
};

export { auth, dbConstants, notifications, paths };
