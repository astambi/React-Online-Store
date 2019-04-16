import React from "react";

const errorStyle = "text-danger";

const InputError = props => {
  const { notification } = props;
  return notification ? <div className={errorStyle}>{notification}</div> : null;
};

export default InputError;
