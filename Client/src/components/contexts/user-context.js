import { createContext } from "react";

const defaultUser = {
  isLoggedIn: false,
  roles: [],
  username: ""
};

const { Consumer, Provider } = createContext({
  defaultUser,
  updateUser: () => {}
});

export { Consumer as UserConsumer, Provider as UserProvider, defaultUser };
