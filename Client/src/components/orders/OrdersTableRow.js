import React from "react";
import CustomButton from "../common/CustomButton";
import LinkDetails from "../common/LinkDetails";
import { stringContains } from "../../services/helpers";
import {
  calculateOrderTotal,
  getProductsTitles,
  toCurrency,
  toShortDate
} from "../../services/helpers";
import { paths } from "../../constants/constants";

const OrderRow = props => {
  const createActionButtons = () => {
    let buttons = [];

    for (const index in handleAction) {
      const btnName = actionBtnName[index];
      const btnHandleAction = handleAction[index];
      const isCancelBtn = stringContains(btnName, "cancel");

      const button = (
        <CustomButton
          key={order._id + index}
          name={btnName}
          handleAction={() => btnHandleAction(order._id)}
          size="sm"
          color={isCancelBtn ? "danger" : "success"}
        />
      );

      buttons.push(button);
    }

    return buttons;
  };

  const {
    order,
    index,
    detailsPath, // myOrders, adminOrders
    actionBtnName, // approve, deliver, archive
    handleAction // optional, admin only
  } = props;

  if (!order) {
    return null;
  }

  const { date, status, products } = order;
  const orderTotal = calculateOrderTotal(products);
  const productTitles = getProductsTitles(products);
  const orderActionButtons = createActionButtons();

  return (
    <tr>
      <th>
        #{index} {productTitles}
      </th>
      <td>{toShortDate(date)}</td>
      <td className="text-right">{toCurrency(orderTotal)}</td>
      <td>
        <span className="label label-info">{status}</span>
      </td>

      {/* Order Details Link: MyOrders, AdminOrders */}
      <td>
        {!detailsPath ? null : (
          <LinkDetails
            name={paths.orderDetailsName}
            path={detailsPath + "/" + order._id}
            size="sm"
          />
        )}
      </td>

      {/* Admin Action Buttons: approve, deliver, cancel */}
      {!handleAction ? null : (
        <td className="row justify-content-around">{orderActionButtons}</td>
      )}
    </tr>
  );
};

export default OrderRow;
