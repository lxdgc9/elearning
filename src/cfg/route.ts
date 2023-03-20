import { Method } from "../type/method";
import { GPERM, PERM, ROLE } from "./perm";

const API = {
  AUTH: {
    LOGIN: {
      METHOD: Method.POST,
      PATH: "/api/auth/login",
    },
  },
  USER: {
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
    MOD_PROF: {
      METHOD: Method.PATCH,
      PATH: "/api/users/profile",
    },
  },
  ROLE: {
    GET: {
      METHOD: Method.GET,
      PATH: "/api/roles",
      ACCESS: [ROLE.GET],
    },
    GET_BY_ID: {
      METHOD: Method.GET,
      PATH: "/api/roles/:id",
      ACCESS: [ROLE.GET],
    },
    NEW: {
      METHOD: Method.POST,
      PATH: "/api/roles",
      ACCESS: [ROLE.NEW],
    },
    MOD: {
      METHOD: Method.PATCH,
      PATH: "/api/roles/:id",
      ACCESS: [ROLE.MOD],
    },
    DEL: {
      METHOD: Method.DELETE,
      PATH: "/api/roles/:id",
      ACCESS: [ROLE.DEL],
    },
  },
  GPERM: {
    GET: {
      METHOD: Method.GET,
      PATH: "/api/group-permissions",
      ACCESS: [GPERM.GET],
    },
    GET_BY_ID: {
      METHOD: Method.GET,
      PATH: "/api/group-permissions/:id",
      ACCESS: [GPERM.GET],
    },
    NEW: {
      METHOD: Method.POST,
      PATH: "/api/group-permissions",
      ACCESS: [GPERM.NEW],
    },
    MOD: {
      METHOD: Method.PATCH,
      PATH: "/api/group-permissions/:id",
      ACCESS: [GPERM.MOD],
    },
    DEL: {
      METHOD: Method.DELETE,
      PATH: "/api/group-permissions/:id",
      ACCESS: [GPERM.DEL],
    },
  },
  PERM: {
    GET: {
      METHOD: Method.GET,
      PATH: "/api/permissions",
      ACCESS: [PERM.GET],
    },
    GET_BY_ID: {
      METHOD: Method.GET,
      PATH: "/api/permissions/:id",
      ACCESS: [PERM.GET],
    },
    NEW: {
      METHOD: Method.POST,
      PATH: "/api/permissions",
      ACCESS: [PERM.NEW],
    },
    MOD: {
      METHOD: Method.PATCH,
      PATH: "/api/permissions/:id",
      ACCESS: [PERM.MOD],
    },
    DEL: {
      METHOD: Method.DELETE,
      PATH: "/api/permissions/:id",
      ACCESS: [PERM.DEL],
    },
  },
  SUBJECT: {
    GET: {
      METHOD: Method.GET,
      PATH: "/api/subjects",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: Method.GET,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: Method.POST,
      PATH: "/api/subjects",
      ACCESS: [],
    },
    MOD: {
      METHOD: Method.PATCH,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: Method.DELETE,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
  },
  CLASS: {
    GET: {
      METHOD: Method.GET,
      PATH: "/api/classes",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: Method.GET,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: Method.POST,
      PATH: "/api/classes",
      ACCESS: [],
    },
    MOD: {
      METHOD: Method.PATCH,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: Method.DELETE,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
  },
};

export { API };
