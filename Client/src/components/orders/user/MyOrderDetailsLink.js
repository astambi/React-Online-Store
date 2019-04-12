import React from "react";
import CustomLink from "../../common/CustomLink";
import { paths } from "../../../constants/constants";

const MyOrderDetailsLink = props => (
  <CustomLink
    name="View"
    path={paths.orderDetailsPath}
    color="warning"
    size="sm"
    {...props} // entity=order, size
  />
);

export default MyOrderDetailsLink;
