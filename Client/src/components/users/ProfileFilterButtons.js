import React from "react";
import CustomButton from "../common/CustomButton";

const ProfileFilterButtons = props => {
  const {
    action,
    loadBookLikes,
    loadBookReviews,
    loadEditProfile,
    loadDeleteProfile
  } = props;

  return (
    <p className="profile-filters d-flex row row-wrap justify-content-around mt-3 mb-3">
      <CustomButton
        name="My favourite books"
        outline={action !== "Likes"}
        handleAction={loadBookLikes}
      />
      <CustomButton
        name="My reviews"
        outline={action !== "Reviews"}
        handleAction={loadBookReviews}
      />
      <CustomButton
        name="Edit profile"
        color="warning"
        outline={action !== "Edit"}
        handleAction={loadEditProfile}
      />

      <CustomButton
        name="Delete profile"
        color="danger"
        outline={action !== "Delete"}
        handleAction={loadDeleteProfile}
      />
    </p>
  );
};

export default ProfileFilterButtons;
