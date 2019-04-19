import React from "react";
import ProfileCrud from "./ProfileCrud";
import { actions } from "../../constants/constants";

const ProfileDelete = () => {
  return <ProfileCrud action={actions.delete} />;
};

export default ProfileDelete;
