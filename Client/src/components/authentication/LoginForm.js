import React from "react";
import Error from "../common/Error";
import Input from "../common/Input";
import InputSubmit from "../common/InputSubmit";

const LoginForm = props => {
  const {
    user,
    error,
    handleSubmit,
    ...otherProps // handleChange, handleBlur, touched, disabled, color
  } = props;

  const { email, password } = user;
  const { message, errors } = error;

  const inputProps = { ...otherProps, errors, message };

  return (
    <div className="form-container container col-md-8 col-lg-7 col-xl-6">
      <h1>Login</h1>

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
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Enter password"
          value={password}
        />

        <InputSubmit value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
