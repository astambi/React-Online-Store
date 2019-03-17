import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// Routes
import AdminRoute from "./components/routes/AdminRoute";
import LoggedInRoute from "./components/routes/LoggedInRoute";
// Components
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import Register from "./components/authentication/Register";
import BookCreate from "./components/books/BookCreate";
import Cart from "./components/cart/Cart";
import NotFound from "./components/common/NotFound";

import { paths } from "./constants/constants";

class AppRouter extends Component {
  render() {
    return (
      <main>
        <Switch>
          {/* All */}
          <Route path={paths.indexPath} exact component={Home} />
          <Route path={paths.homePath} component={Home} />
          <Route path={paths.loginPath} component={Login} />
          <Route path={paths.registerPath} component={Register} />

          {/* Admin */}
          <AdminRoute path={paths.bookCreatePath} component={BookCreate} />

          {/* LoggedIn */}
          <LoggedInRoute path={paths.logoutPath} component={Logout} />
          <LoggedInRoute path={paths.cartPath} component={Cart} />

          {/* Not Found */}
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default AppRouter;
