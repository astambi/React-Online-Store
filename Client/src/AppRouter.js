import React from "react";
import { Route, Switch } from "react-router-dom";
// Routes
import AdminRoute from "./components/routes/AdminRoute";
import LoggedInRoute from "./components/routes/LoggedInRoute";
// Components
import AdminOrderDetails from "./components/orders/admin/AdminOrderDetails";
import AdminOrders from "./components/orders/admin/AdminOrders";
import BookCreate from "./components/books/admin/BookCreate";
import BookEdit from "./components/books/admin/BookEdit";
import BookDelete from "./components/books/admin/BookDelete";
import BookDetails from "./components/books/BookDetails";
import Cart from "./components/cart/Cart";
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import MyOrderDetails from "./components/orders/user/MyOrderDetails";
import MyOrders from "./components/orders/user/MyOrders";
import NotFound from "./components/common/NotFound";
import Profile from "./components/users/Profile";
import ProfileDelete from "./components/users/ProfileDelete";
import ProfileEdit from "./components/users/ProfileEdit";
import Register from "./components/authentication/Register";
import Store from "./components/store/Store";
import { paths } from "./constants/constants";

const AppRouter = () => (
  <Switch>
    {/* All */}
    <Route path={paths.indexPath} exact component={Home} />
    <Route path={paths.homePath} component={Home} />
    <Route path={paths.storePath} component={Store} />
    <Route path={paths.loginPath} component={Login} />
    <Route path={paths.registerPath} component={Register} />
    <Route path={paths.logoutPath} component={Logout} />
    <Route path={`${paths.bookDetailsPath}/:id`} component={BookDetails} />

    {/* Admin */}
    <AdminRoute path={paths.bookCreatePath} component={BookCreate} />
    <AdminRoute path={`${paths.bookEditPath}/:id`} component={BookEdit} />
    <AdminRoute path={`${paths.bookDeletePath}/:id`} component={BookDelete} />
    <AdminRoute path={paths.ordersAdminPath} exact component={AdminOrders} />
    <AdminRoute
      path={`${paths.orderDetailsAdminPath}/:id`}
      component={AdminOrderDetails}
    />

    {/* LoggedIn */}
    <LoggedInRoute path={paths.cartPath} component={Cart} />
    <LoggedInRoute path={paths.profilePath} exact component={Profile} />
    <LoggedInRoute path={paths.profileEditPath} component={ProfileEdit} />
    <LoggedInRoute path={paths.profileDeletePath} component={ProfileDelete} />
    <LoggedInRoute path={paths.myOrdersPath} exact component={MyOrders} />
    <LoggedInRoute
      path={`${paths.orderDetailsPath}/:id`}
      component={MyOrderDetails}
    />

    {/* Not Found */}
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
