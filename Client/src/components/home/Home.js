import React, { Component } from "react";
import { Link } from "react-router-dom";
import LandingMessage from "../common/LandingMessage";
import TopRatedBookCards from "../books/TopRatedBookCards";
import { UserConsumer } from "../contexts/user-context";
import { paths, notifications } from "../../constants/constants";

class Home extends Component {
  render() {
    const { isLoggedIn, username } = this.props;

    return (
      <div className="welcome-wrapper">
        <LandingMessage message={notifications.welcomeMsg} username={username}>
          <Link to={paths.storePath}>{notifications.goToStore}</Link>

          {isLoggedIn ? (
            <Link to={paths.ordersPath}>{notifications.viewOrders}</Link>
          ) : null}
        </LandingMessage>

        <TopRatedBookCards />
      </div>
    );
  }
}

const HomeWithContext = props => {
  return (
    <UserConsumer>
      {({ user }) => (
        <Home
          {...props}
          isLoggedIn={user.isLoggedIn}
          username={user.username}
        />
      )}
    </UserConsumer>
  );
};

// export default Home;
export default HomeWithContext;
