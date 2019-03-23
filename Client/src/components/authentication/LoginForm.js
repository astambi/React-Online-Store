import React from "react";
import Error from "../common/Error";

const LoginForm = props => {
  const { handleChange, handleSubmit, user, error } = props;
  const { email, password } = user;
  const { message, errors } = error;

  return (
    <div className="form-wrapper">
      <h1>Login</h1>

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

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
