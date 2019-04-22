# React Final Project

# React Online Book Store

## Project Description

Book Store contains a collection of books that can be ordered by users. Users can view book details, read and write book reviews and like / unlike books. The number of book likes from users promotes the book to the top-rated book selection on the landing page.

- Store / Top-rated Books:
  Any user can view the available books in the Store, the top-rated selection on the Home page, as well as the book details.

- Pagination:
  Pagination of the book collection is added.

- Search Store:
  Search functionality is added to Store. Books are filtered by title, author or description.

- Creating / Editing / Deleting Books:
  Books in the store are created by Admins only. Admins can edit book details and delete a book from the Store. Each book has a title, an author, list of genres, a short description, a list of likes from users and a list of user reviews (with authors).

- Uploading e-book files / Deleting uploaded book files:
  File uploads are created by Admins only. Admins can replace or delete any uploaded book file.

- Ordering / Liking / Unliking a Book, Reading / Writing Book Reviews:
  User authentication (login) is required to order a book (add it to the user's shopping cart), to write a book review and to like / unlike a book. Anonymous users are redirected to the Login page when they hit a functionality that requires user authentication.

- Liking / Unliking a Book:
  To like / unlike a book the user should login first. Anonymous users are redirected to the Login page when they hit the like/unlike functionality.

- Reading / Writing a Review:
  To write a review the user should be logged in. Anonymous users are redirected to the Login page when they hit the functionality. Reading book reviews is available to any user regardless of authentication. Book reviews can be deleted by Admins only.

- Ordering a Book:
  Ordering a book (adding it to the user cart) requires user authentication. Users are redirected to the Login page when they attempt to order a book while browsing anonymously the Store. The user shopping cart is stored in Local Storage. Hitting the order button adds a book to the cart or increases the item's quantity if already in the cart.

- Shopping Cart:
  The user shopping cart is stored in Local Storage. Logging out clears the shopping cart. Users can increase / decrease the item's quantity in the cart, remove an item from the cart, update item's details (all book details including price) or update the entire card. If the item is no longer available (deleted by an Admin from Store) the item is removed from the shopping cart. Hitting checkout create a new order holding current book info that do no update when the book details are edited by an Admin.

- Own Orders:
  Authenticated users can view a list of their own orders. An authenticated user is allowed to cancel a order if the order has not yet been approved by the Store Admin for delivery, i.e. a user can cancel only his/her own pending orders. Upon appoval of an order for delivery book cancellation by the user is not allowed. Only Admins can update the order status after approval for delivery.

- Admin Orders:
  Admins can view all user orders and modify the status of any order: Approve a pending or a cancelled order, Cancel any order, Deliver an approved order.

- All Orders:
  For convenience user's own orders and all orders viewed by the Admin are listed by status: Pending (new orders placed by users), Cancelled orders (either by the user or by an Admin), Approved orders (orders ready for delivery), Delivered orders (orders delivered to the user).

- Downloading a purchased book:
  Authorized users can download an e-book they have purchased when the order is finalized (i.e. when the order status is Delivered).

- Profile:
  Users can view they own profile data (username, email, user roles if any), update or delete their profile. The profile provides a collection of user's favourite books and written reviews.

- Registration / Login:
  Users can register providing email, username and password. Upon registration users are redirected to Login.

- Notifications:
  [React Toastify](https://github.com/fkhadra/react-toastify) is used for user notifications.

### Public Part (Any user: Authenticated or Anonymous)

The public part of the Book Store is visible by any user without authentication:

- Login / Register
- Book Store with Search
- Home Page listing only the Top-rated book selection
- Book Details Page listing all books details (author, description, genres, price, image, number of likes and all reviews) and buttons for Like, Unlike, Order & toggle book Reviews

### Private Part (Logged in users only)

- Shopping Cart
- Own Orders by status (My Orders) with an option for order cancellation
- Order Details
- Ordering a book from Store / Top-rated selection / Book Details Page
- Liking / Unliking a Book
- Writing a Review
- Downloading a book when the order is delivered
- User's Profile with stats
- Collection of user's e-books for download
- Collection of user's favourite books
- Collection of user's written book reviews
- Updating Profile data (email, password)
- Deleting the current user Profile
- Logout

### Administration Part (Logged in users in Admin role)

- Creating / Editing / Deleting Books
- Deleting Book Reviews
- Viewing all Orders
- Modifing the status of any Order (approving, cancelling, delivering)
- Uploading & deleting book files

## Front-end: React.js

## Back-end: Node.js

## Database: MongoDb

[Read more on how to Install & Configure MongoDB](https://docs.mongodb.com/manual/installation/)

## How to run this project

In the Server project directory run:

### `node index.js`

In the Client project directory run:

### `npm start`
