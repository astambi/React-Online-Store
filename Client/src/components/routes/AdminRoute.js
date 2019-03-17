import React from "react";
import AuthorizedRoute from "./AuthorizedRoute";
import { roles } from "../../constants/constants";

const AdminRoute = props => (
  <AuthorizedRoute {...props} allowedRoles={[roles.adminRole]} />
);

export default AdminRoute;
