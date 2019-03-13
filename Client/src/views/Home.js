import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeMessage from "../components/home/HomeMessage";
import TopRatedBookCards from "../components/books/TopRatedBookCards";
import { paths, auth } from "../constants/constants";

class Home extends Component {
  render() {
    const message = "Welcome to our book store";
    const authUser = window.localStorage.getItem(auth.authUser);

    return (
      <div className="welcome-wrapper">
        <HomeMessage message={message} username={authUser}>
          <Link to={paths.store}>Go To Store</Link>
          <Link to={paths.orders}>View your orders</Link>
        </HomeMessage>

        <TopRatedBookCards />
      </div>
    );
  }
}

export default Home;
