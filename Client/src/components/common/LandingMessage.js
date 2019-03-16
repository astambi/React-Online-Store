import React from "react";

const LandingMessage = props => {
  const { message, username, children } = props;

  return (
    <div className="welcome text-capitalize">
      <h1>
        {message}
        {username ? `, ${username}` : null}!
      </h1>

      {children ? <p>{children}</p> : null}
    </div>
  );
};

export default LandingMessage;
