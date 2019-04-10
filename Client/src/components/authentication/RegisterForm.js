import React from "react";
import Error from "../common/Error";
import Input from "../common/Input";

const RegisterForm = props => {
  const { handleChange, handleSubmit, user, error } = props;
  const { email, username, password, confirmPassword } = user;
  const { message, errors } = error;

  return (
    <div className="form-wrapper">
      <h1>Register</h1>

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
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          errors={errors}
        />

        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm password"
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={handleChange}
          errors={errors}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
