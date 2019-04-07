import { toast } from "react-toastify";

const notifications = {
  default: message => toast(message),
  errorMsg: message => toast.error(message),
  infoMsg: message => toast.info(message),
  successMsg: message => toast.success(message),
  warningMsg: message => toast.warning(message)
};

export default notifications;
