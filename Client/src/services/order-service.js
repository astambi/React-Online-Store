import { post, get } from "../data/crud";
import { dbConstants } from "../constants/constants";

const orderService = {
  createOrder: books => post(dbConstants.orderCreateUrl, books),
  approveById: id => post(dbConstants.ordersApproveByIdUrl, id),
  getUserOrders: () => get(dbConstants.ordersByUserUrl),
  getOrderDetails: id => get(dbConstants.orderDetailsUrl + id),
  getPendingOrders: () => get(dbConstants.ordersPendingUrl)
};

export default orderService;
