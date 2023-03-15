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
    GROLE: {
      GET: {
        METHOD: Method.GET,
        PATH: "/api/group-roles",
      },
      GET_BY_ID: {
        METHOD: Method.GET,
        PATH: "/api/group-roles/:id",
      },
      NEW: {
        METHOD: Method.POST,
        PATH: "/api/group-roles",
      },
      UPDATE: {
        METHOD: Method.PATCH,
        PATH: "/api/group-roles/:id",
      },
      DELETE: {
        METHOD: Method.DELETE,
        PATH: "/api/group-roles/:id",
      },
    },
  },
};

export { ROUTE_CFG };
