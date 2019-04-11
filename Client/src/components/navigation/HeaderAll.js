import React, { Fragment } from "react";
import HeaderLink from "./HeaderLink";
import { paths } from "../../constants/constants";

const HeaderAll = () => (
  <Fragment>
    <HeaderLink to={paths.homePath} name={paths.homeName} />
    <HeaderLink to={paths.storePath} name={paths.storeName} />
  </Fragment>
);

export default HeaderAll;
