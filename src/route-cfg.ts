import { Method } from "./@types/method";

const ROUTE_CFG = {
  API: {
    USERS: {
      GET_USERS: {
        METHOD: Method.GET,
        PATH: "/api/users",
      },
      GET_USER_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/users/:id",
      },
      NEW_USER: {
        METHOD: Method.POST,
        PATH: "/api/users",
      },
    },
    ROLES: {
      GET_ROLES: {
        METHOD: Method.GET,
        PATH: "/api/roles",
      },
      GET_ROLE_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/roles/:id",
      },
      NEW_ROLE: {
        METHOD: Method.POST,
        PATH: "/api/roles",
      },
    },
  },
};

export { ROUTE_CFG };
