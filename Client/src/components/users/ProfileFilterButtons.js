import React from "react";
import CustomButton from "../common/CustomButton";

const ProfileFilterButtons = props => {
  const {
    action,
    loadBookDownloads,
    loadBookLikes,
    loadBookReviews,
    loadEditProfile,
    loadDeleteProfile
  } = props;

  return (
    <p className="profile-filters d-flex row row-wrap justify-content-around mt-3 mb-3">
      <CustomButton
        name="E-books"
        outline={action !== "Downloads"}
        handleAction={loadBookDownloads}
      />
      <CustomButton
        name="Likes"
        outline={action !== "Likes"}
        handleAction={loadBookLikes}
      />
      <CustomButton
        name="Reviews"
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
