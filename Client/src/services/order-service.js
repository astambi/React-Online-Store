import { get, post } from "../data/crud";
import { dbConstants } from "../constants/constants";

const getOrderById = async id => {
  const orders = await orderService.getAllOrders();
  return orders.find(o => o._id === id);
};

const getUserOrderById = async id => {
  const orders = await orderService.getUserOrders();
  return orders.find(o => o._id === id);
};

const orderService = {
  // Admin
  createOrder: books => post(dbConstants.orderCreateUrl, books),
  approveOrderById: id => post(dbConstants.orderApproveByIdUrl + id),
  deliverOrderById: id => post(dbConstants.orderDeliverByIdUrl + id),
  getAllOrders: () => get(dbConstants.ordersAllUrl),
  getApprovedOrders: () => get(dbConstants.ordersApprovedUrl),
  getDeliveredOrders: () => get(dbConstants.ordersDeliveredUrl),
  getPendingOrders: () => get(dbConstants.ordersPendingUrl),
  getOrderById: id => getOrderById(id),
  // User
  getUserOrders: () => get(dbConstants.ordersByUserUrl),
  getUserOrderById: id => getUserOrderById(id)
};

export default orderService;
