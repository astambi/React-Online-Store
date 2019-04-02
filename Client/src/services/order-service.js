import { post, get } from "../data/crud";
import { dbConstants } from "../constants/constants";

const orderService = {
  createOrder: books => post(dbConstants.orderCreateUrl, books),
  approveOrderById: id => post(dbConstants.ordersApproveByIdUrl + id),
  getUserOrders: () => get(dbConstants.ordersByUserUrl),
  getPendingOrders: () => get(dbConstants.ordersPendingUrl)
};

export default orderService;
