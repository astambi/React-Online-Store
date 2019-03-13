import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { paths } from "../../constants/constants";

class Logout extends Component {
  componentDidMount() {
    window.localStorage.clear();
  }

  render() {
    return <Redirect to={paths.index} />;
  }
}

export default Logout;
