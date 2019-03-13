import React from "react";

const textDanger = "text-danger";

const Error = props => {
  const { notification } = props;
  return notification ? <div className={textDanger}>{notification}</div> : null;
};

export default Error;
