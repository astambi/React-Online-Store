import { get, post } from "../data/crud";
import { dbConstants } from "../constants/constants";

const getUserOrderById = async id => {
  const orders = await orderService.getUserOrders();
  return orders.find(o => o._id === id);
};

const getPendingOrderById = async id => {
  const orders = await orderService.getPendingOrders();
  return orders.find(o => o._id === id);
};

const orderService = {
  createOrder: books => post(dbConstants.orderCreateUrl, books),
  approveOrderById: id => post(dbConstants.ordersApproveByIdUrl + id),
  getUserOrderById: id => getUserOrderById(id),
  getUserOrders: () => get(dbConstants.ordersByUserUrl),
  getPendingOrderById: id => getPendingOrderById(id),
  getPendingOrders: () => get(dbConstants.ordersPendingUrl)
};

export default orderService;
