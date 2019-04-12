import React from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ButtonCheckout from "../common/ButtonCheckout";
import ButtonUpdate from "../common/ButtonUpdate";
import LinkInfo from "../common/LinkInfo";
import { paths } from "../../constants/constants";
import { toCurrency } from "../../services/helpers";

const CartTableFooter = props => {
  const { orderTotal, handleCheckout, handleUpdateCart } = props;

  return (
    <tfoot>
      <tr>
        <td>
          <LinkInfo
            name="Continue shopping"
            path={paths.storePath}
            icon={faAngleLeft}
            outline={false}
          />
        </td>

        <td colSpan="2" className="hidden-xs text-center">
          <strong>Total {toCurrency(orderTotal)}</strong>
        </td>

        <td className="text-center">
          <ButtonUpdate handleAction={handleUpdateCart} />
        </td>

        <td colSpan="1" className="text-center">
          <ButtonCheckout handleAction={handleCheckout} />
        </td>
      </tr>
    </tfoot>
  );
};

export default CartTableFooter;
