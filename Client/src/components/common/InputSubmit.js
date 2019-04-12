import React from "react";

const InputSubmit = props => {
  const { value, color = "success", size = "lg" } = props;

  return (
    <input
      type="submit"
      className={`btn 
      btn-${color} 
      btn-${size} 
      btn-block 
      text-capitalize`}
      value={value}
    />
  );
};

export default InputSubmit;
