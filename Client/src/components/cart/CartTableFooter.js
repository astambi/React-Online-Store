import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { paths } from "../../constants/constants";
import { toCurrency } from "../../services/helpers";

const CartTableFooter = props => {
  const { orderTotal, handleCheckout, handleUpdateCart } = props;

  return (
    <tfoot>
      <tr>
        <td>
          <Link to={paths.storePath} className="btn btn-warning">
            <FontAwesomeIcon icon={faAngleLeft} /> Continue shopping
          </Link>
        </td>

        <td colSpan="2" className="hidden-xs text-center">
          <strong>Total {toCurrency(orderTotal)}</strong>
        </td>

        <td className="text-center">
          <button className="btn btn-info" onClick={handleUpdateCart}>
            <FontAwesomeIcon icon={faSync} />
          </button>
        </td>

        <td colSpan="1">
          <button
            className="btn btn-success btn-block"
            onClick={handleCheckout}
          >
            Checkout <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

export default CartTableFooter;
