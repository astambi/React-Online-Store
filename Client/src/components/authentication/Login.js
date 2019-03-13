import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange = event => {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value
    });

    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { target } = event;

    // TODO
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="form-wrapper">
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter e-mail"
              value={email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={this.handleChange}
            />
          </div>

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
