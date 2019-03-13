import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import Login from "./authentication/Login";
import NotFound from "./common/NotFound";

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default AppRouter;
