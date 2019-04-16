import React from "react";
import InputError from "./InputError";

const Input = props => {
  const {
    // Input fields
    id,
    name,
    value,
    type,
    label,
    placeholder,
    min,
    minLength,
    maxLength,
    step,
    required,
    disabled,
    readOnly,
    // Errors
    color,
    message,
    errors = {},
    touched = {},
    // Handlers
    handleChange,
    handleBlur
  } = props;

  const hasServerErrorMsg = name && errors[name] && message !== "";
  const hasInputChangeError = name && errors[name] && touched[name]; // only upon blur

  return (
    <div className="form-group">
      <label htmlFor={id} className={`text-capitalize`}>
        {label || name}
      </label>

      <input
        // Input fields
        type={type}
        id={id || name}
        name={name}
        value={value}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        min={min}
        minLength={minLength}
        maxLength={maxLength}
        step={step}
        placeholder={placeholder}
        // Errors in css
        className={`form-control 
        text-${hasInputChangeError || hasServerErrorMsg ? "danger" : color}`}
        // Handlers
        onChange={handleChange}
        onBlur={() => (handleBlur ? handleBlur(name) : {})}
      />

      {/* Errors validation msgs */}
      {hasInputChangeError || hasServerErrorMsg ? (
        <InputError notification={errors[name]} />
      ) : null}
    </div>
  );
};

export default Input;
