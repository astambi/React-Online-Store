import React from "react";
import ProfileCrud from "../users/ProfileCrud";
import { actions } from "../../constants/constants";

const Login = () => <ProfileCrud action={actions.login} />;

export default Login;
