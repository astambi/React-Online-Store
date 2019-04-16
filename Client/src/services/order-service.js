import { get, post } from "../data/crud";
import { dbConstants } from "../constants/constants";
import notificationService from "./notification-service";
import { notificationMessages } from "../constants/constants";

const getOrderById = async id => {
  const orders = await orderService.getAllOrders();
  return orders.find(o => o._id === id);
};

const getUserOrderById = async id => {
  const orders = await orderService.getUserOrders();
  return orders.find(o => o._id === id);
};

const updateOrderStatusUpdateById = async (
  id,
  updateStatusByIdFunc,
  loadOrdersFunc
) => {
  if (!id) {
    notificationService.errorMsg(notificationMessages.orderNotFoundMsg);
    return;
  }

  const result = await updateStatusByIdFunc(id); // status specific func

  const { message, success } = result;
  console.log(result);

  if (!success) {
    // Error Notification
    notificationService.errorMsg(message);
  } else {
    // Update orders
    await loadOrdersFunc(); // status specific func
    // Success Notification
    notificationService.successMsg(message);
  }
};

const orderService = {
  // Admin
  createOrder: books => post(dbConstants.orderCreateUrl, books),
  approveOrderById: id => post(dbConstants.orderApproveByIdUrl + id),
  cancelOrderById: id => post(dbConstants.orderCancelByIdUrl + id),
  deliverOrderById: id => post(dbConstants.orderDeliverByIdUrl + id),
  getAllOrders: () => get(dbConstants.ordersAllUrl),
  getApprovedOrders: () => get(dbConstants.ordersApprovedUrl),
  getCancelledOrders: () => get(dbConstants.ordersCancelledUrl),
  getDeliveredOrders: () => get(dbConstants.ordersDeliveredUrl),
  getPendingOrders: () => get(dbConstants.ordersPendingUrl),
  getOrderById: id => getOrderById(id),
  // User
  getUserOrders: () => get(dbConstants.ordersByUserUrl),
  getUserOrderById: id => getUserOrderById(id),
  updateOrderStatusById: (id, updateStatusFunc, loadOrdersFunc) =>
    updateOrderStatusUpdateById(id, updateStatusFunc, loadOrdersFunc)
};

export default orderService;
