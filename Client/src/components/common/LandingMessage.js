import React from "react";

const LandingMessage = props => {
  const { message, username, children } = props;

  return (
    <section className="landing-msg">
      <h1>
        {message}
        {username ? `, ${username}!` : null}
      </h1>

      {children ? <p>{children}</p> : null}
    </section>
  );
};

export default LandingMessage;
