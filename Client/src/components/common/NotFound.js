import React from "react";
import LandingMessage from "./LandingMessage";
import LinkInfo from "./LinkInfo";
import { notifications, paths } from "../../constants/constants";

const NotFound = props => (
  <LandingMessage message={props.message || notifications.notFound}>
    <LinkInfo name={notifications.goToHome} path={paths.homePath} size="lg" />
  </LandingMessage>
);

export default NotFound;
