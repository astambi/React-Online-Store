import React from "react";
import Error from "./Error";

const Input = props => {
  const {
    id,
    name,
    value,
    type,
    label,
    placeholder,
    min,
    minLength,
    step,
    required,
    disabled,
    readOnly,
    onChange,
    errors
  } = props;

  const notValid = errors && errors[name];

  // const validationStyle =
  // notValid
  //   ? "border border-danger"
  //   : "border border-success";

  return (
    <div className="form-group">
      <label htmlFor={id} className="text-capitalize">
        {label || name}
      </label>

      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        min={min}
        minLength={minLength}
        step={step}
        placeholder={placeholder}
        // className={`form-control ${validationStyle}`}
        onChange={onChange}
      />

      {notValid ? <Error notification={errors[name]} /> : null}
    </div>
  );
};

export default Input;
