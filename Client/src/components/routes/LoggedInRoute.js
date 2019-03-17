import React from "react";
import AuthorizedRoute from "./AuthorizedRoute";

const LoggedInRoute = props => <AuthorizedRoute {...props} allowedRoles={[]} />;

export default LoggedInRoute;
