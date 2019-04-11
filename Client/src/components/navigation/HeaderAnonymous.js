import React, { Fragment } from "react";
import HeaderLink from "./HeaderLink";
import { paths } from "../../constants/constants";

const HeaderAdmin = () => (
  <Fragment>
    <HeaderLink to={paths.loginPath} name={paths.loginName} />
    <HeaderLink to={paths.registerPath} name={paths.registerName} />
  </Fragment>
);

export default HeaderAdmin;
