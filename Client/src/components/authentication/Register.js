import React from "react";
import ProfileCrud from "../users/ProfileCrud";
import { actions } from "../../constants/constants";

const Register = () => <ProfileCrud action={actions.register} />;

export default Register;
