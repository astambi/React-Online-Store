import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationsContainer = props => (
  <ToastContainer
    position="bottom-right"
    autoClose={1700}
    hideProgressBar
    newestOnTop
    closeButton={false}
    closeOnClick
    draggable
    pauseOnHover
    pauseOnVisibilityChange
    rtl={false} // right to left content
    transition={Flip}
    className="notifications-container"
    toastClassName="notification"
  />
);

export default NotificationsContainer;
