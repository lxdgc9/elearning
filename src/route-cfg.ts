import { Method } from "./@types/method";

const ROUTE_CFG = {
  API: {
    AUTH: {
      LOGIN: {
        METHOD: Method.POST,
        PATH: "/api/auth/login",
      },
    },
    USERS: {
      GET: {
        METHOD: Method.GET,
        PATH: "/api/users",
      },
      GET_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/users/:id",
      },
      CURR_USER: {
        METHOD: Method.GET,
        PATH: "/api/users/me",
      },
      NEW: {
        METHOD: Method.POST,
        PATH: "/api/users",
      },
      UPDATE_PROF: {
        METHOD: Method.PATCH,
        PATH: "/api/users/profile",
      },
    },
    PERMS: {
      GET: {
        METHOD: Method.GET,
        PATH: "/api/permissions",
      },
      GET_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/permissions/:id",
      },
      NEW: {
        METHOD: Method.POST,
        PATH: "/api/permissions",
      },
      UPDATE: {
        METHOD: Method.PATCH,
        PATH: "/api/permissions/:id",
      },
      DELETE: {
        METHOD: Method.DELETE,
        PATH: "/api/permissions/:id",
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
