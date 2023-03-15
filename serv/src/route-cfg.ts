import { Method } from "./@types/method";

const ROUTE_CFG = {
  API: {
    USERS: {
      GET: {
        METHOD: Method.GET,
        PATH: "/api/users",
      },
      GET_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/users/:id",
      },
      NEW: {
        METHOD: Method.POST,
        PATH: "/api/users",
      },
    },
    ROLES: {
      GET: {
        METHOD: Method.GET,
        PATH: "/api/roles",
      },
      GET_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/roles/:id",
      },
      NEW: {
        METHOD: Method.POST,
        PATH: "/api/roles",
      },
      UPDATE: {
        METHOD: Method.PATCH,
        PATH: "/api/roles/:id",
      },
      DELETE: {
        METHOD: Method.DELETE,
        PATH: "/api/roles/:id",
      },
    },
  },
};

export { ROUTE_CFG };
