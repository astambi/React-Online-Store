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
import BookDetails from "./components/books/BookDetails";
import BookEdit from "./components/books/BookEdit";
import BookDelete from "./components/books/BookDelete";
import PendingOrders from "./components/orders/PendingOrders";
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
          <Route
            path={`${paths.bookDetailsPath}/:id`}
            component={BookDetails}
          />

          {/* Admin */}
          <AdminRoute path={paths.bookCreatePath} component={BookCreate} />
          <AdminRoute path={`${paths.bookEditPath}/:id`} component={BookEdit} />
          <AdminRoute
            path={`${paths.bookDeletePath}/:id`}
            component={BookDelete}
          />
          <AdminRoute
            path={paths.ordersPendingPath}
            component={PendingOrders}
          />

          {/* LoggedIn */}
          <LoggedInRoute path={paths.cartPath} component={Cart} />
          <LoggedInRoute path={paths.profilePath} component={NotFound} />
          <LoggedInRoute exact path={paths.ordersPath} component={MyOrders} />
          <LoggedInRoute
            path={`${paths.orderDetailsPath}/:id`}
            component={OrderDetails}
          />

          {/* Not Found */}
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default AppRouter;
