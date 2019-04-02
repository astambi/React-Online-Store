import { post, get } from "../data/crud";
import { dbConstants } from "../constants/constants";

const orderService = {
  createOrder: books => post(dbConstants.orderCreateUrl, books),
  getUserOrders: () => get(dbConstants.ordersByUserUrl),
  getOrderDetails: id => get(dbConstants.orderDetailsUrl + id)
};

export default orderService;
