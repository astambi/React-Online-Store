import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserConsumer } from "../contexts/user-context";
import { paths, auth } from "../../constants/constants";

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOrdered: false
    };
  }

  orderBook = () => {
    const { user, updateUser, book } = this.props;
    let cart = user.cart.slice();
    let orderedBook = cart.find(b => b._id === book._id);

    // Add book to cart
    if (orderedBook === null || orderedBook === undefined) {
      cart.push({ ...book, quantity: 1 }); // add new book
    } else {
      orderedBook.quantity += 1; // update book quantity
    }
    console.log(cart);

    // Update user cart
    const userToUpdate = { ...user, cart };
    window.localStorage.setItem(auth.authUser, JSON.stringify(userToUpdate));
    updateUser(userToUpdate);
    this.setState({ isOrdered: true });
  };

  render() {
    const { isOrdered } = this.state;

    if (isOrdered) {
      return <Redirect to={paths.cartPath} />;
    }

    const { book } = this.props;
    const { _id, description, image, title } = book;

    return (
      <div className="card col-4">
        <img className="card-img-top card-image" src={image} alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer">
          <Link
            to={`${paths.detailsPath}/${_id}`}
            type="button"
            className="btn btn-primary float-right btn-sm"
          >
            {paths.detailsName}
          </Link>
          <button
            type="button"
            className="btn btn-warning float-right btn-sm"
            onClick={this.orderBook}
          >
            Order
          </button>
        </div>
      </div>
    );
  }
}

const BookCardWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <BookCard {...props} user={user} updateUser={updateUser} />
    )}
  </UserConsumer>
);

// export default BookCard;
export default BookCardWithContext;
