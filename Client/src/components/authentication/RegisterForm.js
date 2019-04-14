import React from "react";
import Error from "../common/Error";
import Input from "../common/Input";
import InputSubmit from "../common/InputSubmit";

const RegisterForm = props => {
  const {
    user,
    error,
    handleSubmit,
    ...otherProps // handleChange, handleBlur, touched, disabled, color
  } = props;

  const { email, username, password, confirmPassword } = user;
  const { message, errors } = error;

  const inputProps = { ...otherProps, errors, message };

  return (
    <div className="form-container container col-lg-8 col-xl-6">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        {message ? <Error notification={message} /> : null}

        <Input
          {...inputProps}
          type="email"
          name="email"
          id="email"
          label="E-mail"
          placeholder="Enter e-mail"
          value={email}
        />

        <Input
          {...inputProps}
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          value={username}
        />

        <Input
          {...inputProps}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={password}
        />

        <Input
          {...inputProps}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm password"
          placeholder="Enter your password again"
          value={confirmPassword}
        />

        <InputSubmit value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
