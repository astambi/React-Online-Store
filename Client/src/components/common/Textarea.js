import React from "react";
import Error from "./Error";

const Textarea = props => {
  const {
    id,
    name,
    value,
    label,
    placeholder,
    rows = 2,
    required,
    disabled,
    readOnly,
    onChange,
    error
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <textarea
        rows={rows}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        className="form-control"
        onChange={onChange}
      />

      {error ? <Error notification={error} /> : null}
    </div>
  );
};

export default Textarea;
