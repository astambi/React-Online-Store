import React, { Component, Fragment } from "react";
import { UserConsumer } from "../contexts/user-context";
import BookList from "../books/BookList";
import Input from "../common/Input";
import InputSubmit from "../common/InputSubmit";
import ProfileSection from "./ProfileSection";
import TitleWithValue from "./TitleWithValue";
import UserBookReviews from "../reviews/UserBookReviews";
import notificationService from "../../services/notification-service";
import userService from "../../services/user-service";
import { handleInputChange } from "../../services/helpers";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLoadingLikes: false,
      isLoadingReviews: false,
      user: {
        email: "",
        username: "",
        roles: [],
        pasword: ""
      },
      bookLikes: [],
      bookReviews: []
    };
  }

  componentDidMount = async () => {
    await this.loadUserProfile();
    await this.loadBookLikes();
    await this.loadBookReviews();
  };

  loadUserProfile = async () => {
    this.setState({ isLoading: true });
    const profile = await userService.getCurrentUserProfile();
    const { email, username, roles } = profile;
    const userFromDb = { email, username, roles };
    this.setState({ isLoading: false, user: userFromDb });
  };

  loadBookLikes = async () => {
    this.setState({ isLoadingLikes: true });
    this.setState({
      isLoadingLikes: false,
      bookLikes: await userService.getCurrentUserBookLikes()
    });
  };

  loadBookReviews = async () => {
    this.setState({ isLoadingReviews: true });
    this.setState({
      isLoadingReviews: false,
      bookReviews: await userService.getCurrentUserReviewsOnBooks()
    });
  };

  handleChange = event => handleInputChange.bind(this)(event, "user");

  handleSubmitUpdate = async event => {
    event.preventDefault();

    const { user } = this.state;
    const { email, username, password } = user;
    const userData = { email, username, password };

    const result = await userService.updateUser(userData);
    console.log(result);
    const { success, message } = result;
    if (!success) {
      notificationService.errorMsg(message);
    } else {
      notificationService.successMsg(message);
    }
  };

  render() {
    const {
      user,
      bookLikes,
      bookReviews,
      isLoading,
      isLoadingLikes,
      isLoadingReviews
    } = this.state;

    let bookReviewsCount = 0;
    bookReviews.map(br => (bookReviewsCount += br.reviews.length));

    if (!user) {
      return null;
    }
    const { email, username, roles, password } = user;

    return (
      <Fragment>
        <ProfileSection isLoading={isLoading} title="My profile">
          <TitleWithValue title="Username" value={username} />
          <TitleWithValue title="Email" value={email} />
          <TitleWithValue title="Roles" value={roles.join(" ")} />
        </ProfileSection>

        <ProfileSection
          isLoading={isLoadingLikes}
          title={`My favourite books (${bookLikes.length})`}
        >
          <BookList books={bookLikes} />
        </ProfileSection>

        <ProfileSection
          isLoading={isLoadingReviews}
          title={`My reviews (${bookReviewsCount})`}
        >
          {bookReviews.map(br => (
            <UserBookReviews
              key={br.book._id}
              book={br.book}
              reviews={br.reviews}
            />
          ))}
        </ProfileSection>

        <ProfileSection title="Update profile">
          <form onSubmit={this.handleSubmitUpdate}>
            <Input
              name="username"
              placeholder="Enter new username"
              value={username}
              handleChange={this.handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Enter new email"
              value={email}
              handleChange={this.handleChange}
            />

            <Input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              handleChange={this.handleChange}
            />

            <InputSubmit
              className="col"
              value="Update"
              size=""
              color="primary"
            />
          </form>
        </ProfileSection>
      </Fragment>
    );
  }
}

// export default Profile;

const ProfileWithContext = props => (
  <UserConsumer>
    {({ user, updateUser }) => (
      <Profile {...props} username={user.username} updateUser={updateUser} />
    )}
  </UserConsumer>
);

export default ProfileWithContext;
