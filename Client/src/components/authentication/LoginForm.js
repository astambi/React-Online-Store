import React from "react";
import Error from "../common/Error";
import Input from "../common/Input";

const LoginForm = props => {
  const { handleChange, handleSubmit, user, error } = props;
  const { email, password } = user;
  const { message, errors } = error;

  return (
    <div className="form-wrapper">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        {message ? <Error notification={message} /> : null}

        <Input
          type="email"
          name="email"
          id="email"
          label="E-mail"
          placeholder="Enter e-mail"
          value={email}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="password"
          name="password"
          id="password"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          errors={errors}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
