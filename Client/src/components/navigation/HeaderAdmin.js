import React, { Fragment } from "react";
import HeaderLink from "./HeaderLink";
import { paths } from "../../constants/constants";

const HeaderAdmin = () => (
  <Fragment>
    <HeaderLink to={paths.bookCreatePath} name={paths.bookCreateName} />
    <HeaderLink to={paths.ordersAdminPath} name={paths.ordersAdminName} />
    <HeaderLink to={paths.logoutPath} name={paths.logoutName} />
  </Fragment>
);

export default HeaderAdmin;
