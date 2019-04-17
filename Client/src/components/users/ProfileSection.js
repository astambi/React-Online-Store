import React from "react";
import withLoading from "../hocs/withLoading";

const ProfileSection = props => {
  const { title, children } = props;

  return (
    <section className="row">
      <h2 className="col-md-3">{title}</h2>
      <section className="col-md-9">{children}</section>
    </section>
  );
};

// export default ProfileSection;
export default withLoading(ProfileSection);
