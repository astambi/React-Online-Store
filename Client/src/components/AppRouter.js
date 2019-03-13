import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import Login from "./authentication/Login";
import Logout from "./common/Logout";
import Register from "./authentication/Register";
import NotFound from "./common/NotFound";
import { paths } from "../constants/constants";

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path={paths.index} exact component={Home} />
        <Route path={paths.home} component={Home} />
        <Route path={paths.login} component={Login} />
        <Route path={paths.logout} component={Logout} />
        <Route path={paths.register} component={Register} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default AppRouter;
