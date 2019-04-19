import React from "react";
import ProfileCrud from "./ProfileCrud";
import { actions } from "../../constants/constants";

const ProfileEdit = () => {
  return <ProfileCrud action={actions.edit} />;
};

export default ProfileEdit;
