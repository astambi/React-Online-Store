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
        {// Error notification
        message ? <Error notification={message} /> : null}

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            // required
            type="email"
            name="email"
            id="email"
            placeholder="Enter e-mail"
            value={email}
            onChange={handleChange}
          />
          {// Error notification
          errors && errors.email ? <Error notification={errors.email} /> : null}
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            // required
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
          {// Error notification
          errors && errors.username ? (
            <Error notification={errors.username} />
          ) : null}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            // required
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
          {// Error notification
          errors && errors.password ? (
            <Error notification={errors.password} />
          ) : null}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            // required
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={handleChange}
          />
          {// Error notification
          errors && errors.confirmPassword ? (
            <Error notification={errors.confirmPassword} />
          ) : null}
        </div>

        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterForm;
