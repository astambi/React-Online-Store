import React, { Component } from "react";
import LandingMessage from "../common/LandingMessage";
import LinkInfo from "../common/LinkInfo";
import TopRatedBooks from "../books/TopRatedBooks";
import { UserConsumer } from "../contexts/user-context";
import { paths, notifications } from "../../constants/constants";

class Home extends Component {
  render() {
    const { isLoggedIn, username } = this.props;

    return (
      <section>
        <LandingMessage message={notifications.welcomeMsg} username={username}>
          <LinkInfo
            name={paths.storeGoToName}
            path={paths.storePath}
            size="lg"
          />

          {isLoggedIn ? (
            <LinkInfo
              name={notifications.viewOrders}
              path={paths.ordersPath}
              size="lg"
            />
          ) : null}
        </LandingMessage>

        <TopRatedBooks />
      </section>
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
