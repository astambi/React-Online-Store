import React from "react";

const TitleWithValue = props => {
  const { title, value } = props;

  return (
    <p className="">
      <span className="title font-weight-bold">{title} </span>
      <span className="value text-uppercase font-weight-bold text-primary">
        {value}
      </span>
    </p>
  );
};

export default TitleWithValue;
