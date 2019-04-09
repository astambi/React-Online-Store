import React from "react";
import CustomLink from "../../common/buttons/CustomLink";
import { paths } from "../../../constants/constants";

const AdminOrderDetailsLink = props => (
  <CustomLink
    name="View"
    path={paths.orderDetailsAdminPath}
    color="warning"
    size="sm"
    {...props} // entity=order, size
  />
);

export default AdminOrderDetailsLink;
