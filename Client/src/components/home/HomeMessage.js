import React from "react";

const HomeMessage = props => {
  const { message, username, children } = props;

  return (
    <div className="welcome">
      <h1>
        {message}, {username || "Guest"}!
      </h1>

      <p>{children}</p>
    </div>
  );
};

export default HomeMessage;
