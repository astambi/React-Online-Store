import React, { Fragment } from "react";
import Input from "../common/Input";
import InputError from "../common/InputError";
import InputSubmit from "../common/InputSubmit";

const ProfileForm = props => {
  const {
    action,
    user,
    error,
    handleSubmit,
    ...otherProps // handleChange, handleBlur, touched, disabled, color
  } = props;
  const { color } = props;

  const { email, username, password, confirmPassword } = user;
  const { message, errors } = error;

  const inputProps = { ...otherProps, errors, message };

  return (
    <div className="form-container container col-lg-8 col-xl-6">
      <h1 className={`text-capitalize text-${color}`}>{action}</h1>

      <form onSubmit={handleSubmit}>
        {message ? <InputError notification={message} /> : null}

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

        {/* Hide passwords for Delete*/}
        {action === "delete" ? null : (
          <Fragment>
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
          </Fragment>
        )}

        <InputSubmit value={action} color={color} />
      </form>
    </div>
  );
};

export default ProfileForm;
