import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Register from "./components/authentication/Register";
import NotFound from "./components/common/NotFound";
import { paths } from "./constants/constants";

class AppRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path={paths.indexPath} exact component={Home} />
          <Route path={paths.homePath} component={Home} />
          <Route path={paths.loginPath} component={Login} />
          <Route path={paths.logoutPath} component={Logout} />
          <Route path={paths.registerPath} component={Register} />
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default AppRouter;
