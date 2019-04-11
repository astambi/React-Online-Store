import React, { Fragment } from "react";
import HeaderLink from "./HeaderLink";
import { paths } from "../../constants/constants";

const HeaderAuth = props => {
  const { profileName } = props;

  return (
    <Fragment>
      <HeaderLink to={paths.ordersPath} name={paths.ordersName} />
      <HeaderLink to={paths.cartPath} name={paths.cartName} />
      <HeaderLink to={paths.profilePath} name={profileName} />
      <HeaderLink to={paths.logoutPath} name={paths.logoutName} />
    </Fragment>
  );
};

export default HeaderAuth;
