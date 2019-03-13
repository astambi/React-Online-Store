import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeMessage from "../components/home/HomeMessage";
import TopRatedBookCards from "../components/books/TopRatedBookCards";

class Home extends Component {
  render() {
    const message = "Welcome to our book store";
    const username = "User";

    return (
      <div className="welcome-wrapper">
        <HomeMessage message={message} username={username}>
          <Link to="/store">Go To Store</Link>
          <Link to="/orders">View your orders</Link>
        </HomeMessage>

        <TopRatedBookCards />
      </div>
    );
  }
}

export default Home;
