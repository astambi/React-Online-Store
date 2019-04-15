import React from "react";

const LandingMessage = props => {
  const { message, username, children } = props;

  return (
    <section className="landing-msg col-md-8 col-lg-6 col-xl-5">
      <h1>
        {message}
        {username ? `, ${username}!` : null}
      </h1>

      {children ? <p className="row">{children}</p> : null}
    </section>
  );
};

export default LandingMessage;
