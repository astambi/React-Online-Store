import React, { Component } from "react";
import Loading from "../common/Loading";
import notificationService from "../../services/notification-service";
import { notificationMessages } from "../../constants/constants";

const withLoading = WrappedComponent => {
  return class WithLoading extends Component {
    render() {
      const { isLoading, ...otherProps } = this.props;

      if (isLoading) {
        // notificationService.loadingMsg(notificationMessages.loadingMsg);
        return <Loading />;
      }

      WithLoading.displayName =
        WrappedComponent.displayName ||
        WrappedComponent.name ||
        "WrappedComponentWithLoading";
      console.log(WithLoading.displayName);

      return <WrappedComponent {...otherProps} />;
    }
  };
};

export default withLoading;
