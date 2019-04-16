import { toast } from "react-toastify";

const notificationService = {
  default: message => toast(message),
  loadingMsg: message => toast(message, { autoClose: 100 }),
  errorMsg: message => toast.error(message),
  infoMsg: message => toast.info(message),
  successMsg: message => toast.success(message),
  warningMsg: message => toast.warning(message)
};

export default notificationService;
