import React from "react";
import CustomButton from "../common/CustomButton";
import LinkDetails from "../common/LinkDetails";
import {
  calculateOrderTotal,
  getProductsTitles,
  toCurrency,
  toShortDate
} from "../../services/helpers";
import { paths } from "../../constants/constants";

const OrderRow = props => {
  const {
    order,
    index,
    detailsPath, // myOrders, adminOrders
    actionBtnName, // approve, deliver, archive
    handleAction // optional, admin only
  } = props;

  console.log(props);

  if (!order) {
    return null;
  }

  const { date, status, products } = order;
  const orderTotal = calculateOrderTotal(products);
  const productTitles = getProductsTitles(products);

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

      {/* Admin Actions: approve, deliver */}
      {handleAction ? (
        <td>
          {
            <CustomButton
              name={actionBtnName}
              handleAction={() => handleAction(order._id)}
              size="sm"
            />
          }
        </td>
      ) : null}
    </tr>
  );
};

export default OrderRow;
