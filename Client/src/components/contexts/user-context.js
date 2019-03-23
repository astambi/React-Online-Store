import { createContext } from "react";

const defaultUser = {
  isLoggedIn: false,
  roles: [],
  username: ""
};

const { Consumer: UserConsumer, Provider: UserProvider } = createContext({
  defaultUser,
  updateUser: () => {}
});

export { UserConsumer, UserProvider, defaultUser };
