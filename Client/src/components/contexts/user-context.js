import { createContext } from "react";

const defaultUser = {
  isLoggedIn: false,
  username: "",
  roles: [],
  cart: []
};

const { Consumer: UserConsumer, Provider: UserProvider } = createContext({
  defaultUser,
  isAdmin: () => {},
  isLoginRequired: () => {},
  orderBook: () => {},
  updateUser: () => {}
});

export { UserConsumer, UserProvider, defaultUser };
