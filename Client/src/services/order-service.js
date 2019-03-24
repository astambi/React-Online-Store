import { post } from "../data/crud";
import { dbConstants } from "../constants/constants";

const orderService = {
  createOrder: books => post(dbConstants.orderCreateUrl, books)
};

export default orderService;
