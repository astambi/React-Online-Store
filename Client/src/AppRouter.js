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
import Store from "./components/store/Store";
import Cart from "./components/cart/Cart";
import MyOrders from "./components/orders/MyOrders";
import OrderDetails from "./components/orders/OrderDetails";
import BookCreate from "./components/books/BookCreate";
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
          <Route path={paths.storePath} component={Store} />
          <Route path={paths.loginPath} component={Login} />
          <Route path={paths.registerPath} component={Register} />
          <Route path={paths.logoutPath} component={Logout} />

          {/* Admin */}
          <AdminRoute path={paths.bookCreatePath} component={BookCreate} />

          {/* LoggedIn */}
          <LoggedInRoute path={paths.cartPath} component={Cart} />
          <LoggedInRoute
            path={`${paths.orderDetailsPath}/:id`}
            component={OrderDetails}
          />
          <LoggedInRoute path={paths.ordersPath} component={MyOrders} />

          {/* Not Found */}
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default AppRouter;
