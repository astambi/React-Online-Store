import React from "react";
import { Link } from "react-router-dom";
import LandingMessage from "./LandingMessage";
import { notifications, paths } from "../../constants/constants";

const NotFound = () => (
  <div className="welcome-wrapper">
    <LandingMessage message={notifications.notFound}>
      <Link to={paths.homePath}>{notifications.goToHome}</Link>
    </LandingMessage>
  </div>
);

export default NotFound;
