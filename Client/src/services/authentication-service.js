import { post } from "../data/crud";
import { dbConstants } from "../constants/constants";

// class AuthenticationService {
//   loginUser = credentials => post(dbConstants.loginUrl, credentials);
//   logoutUser = () => post(dbConstants.logoutUrl);
//   registerUser = credentials => post(dbConstants.registerUrl, credentials);
// }

// export default AuthenticationService;

const authenticationService = {
  loginUser: userCredential => post(dbConstants.loginUrl, userCredential),
  logoutUser: () => post(dbConstants.logoutUrl),
  registerUser: userData => post(dbConstants.registerUrl, userData)
};

export default authenticationService;
