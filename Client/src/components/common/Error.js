import React from "react";

const errorStyle = "text-danger";

const Error = props => {
  const { notification } = props;
  return notification ? <div className={errorStyle}>{notification}</div> : null;
};

export default Error;
