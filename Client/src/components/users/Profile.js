import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import MyBookLikes from "./MyBookLikes";
import MyBookReviews from "./MyBookReviews";
import ProfileFilterButtons from "./ProfileFilterButtons";
import ProfileSection from "./ProfileSection";
import TitleWithValue from "./TitleWithValue";
import userService from "../../services/user-service";
import { paths } from "../../constants/constants";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      action: "",
      user: {
        email: "",
        username: "",
        roles: []
      }
    };
  }

  componentDidMount = async () => await this.loadUserProfile();

  loadBookLikes = () => this.setState({ action: "Likes" });
  loadBookReviews = () => this.setState({ action: "Reviews" });
  loadEditProfile = () => this.setState({ action: "Edit" });
  loadDeleteProfile = () => this.setState({ action: "Delete" });

  loadUserProfile = async () => {
    const profile = await userService.getCurrentUserProfile();

    const currentUser = {
      email: profile.email,
      username: profile.username,
      roles: profile.roles
    };

    this.setState({ user: currentUser });
  };

  render() {
    const { action, user } = this.state;

    if (!user) {
      return null;
    }

    if (action === "Edit") {
      return <Redirect to={paths.profileEditPath} />;
    }

    if (action === "Delete") {
      return <Redirect to={paths.profileDeletePath} />;
    }

    const { email, username, roles } = user;

    return (
      <Fragment>
        <ProfileSection title="My profile">
          <TitleWithValue title="Username" value={username} />
          <TitleWithValue title="Email" value={email} />
          <TitleWithValue title="Roles" value={roles.join(" ")} />
          <ProfileFilterButtons
            action={action}
            loadBookLikes={this.loadBookLikes}
            loadBookReviews={this.loadBookReviews}
            loadEditProfile={this.loadEditProfile}
            loadDeleteProfile={this.loadDeleteProfile}
          />
        </ProfileSection>

        {action === "Likes" ? <MyBookLikes /> : null}
        {action === "Reviews" ? <MyBookReviews /> : null}
      </Fragment>
    );
  }
}

export default Profile;
