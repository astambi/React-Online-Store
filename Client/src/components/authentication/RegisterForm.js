import React from "react";
import Error from "../common/Error";

const RegisterForm = props => {
  console.log(props);
  const { handleChange, handleSubmit, user, error } = props;
  const { email, username, password, confirmPassword } = user;
  const { message, errors } = error;

  return (
    <div className="form-wrapper">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        {message ? <Error notification={message} /> : null}

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={handleChange}
          />
          {errors && errors.email ? (
            <Error notification={errors.email} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
          {errors && errors.username ? (
            <Error notification={errors.username} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
          {errors && errors.password ? (
            <Error notification={errors.password} />
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={handleChange}
          />
          {errors && errors.confirmPassword ? (
            <Error notification={errors.confirmPassword} />
          ) : null}
        </div>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
