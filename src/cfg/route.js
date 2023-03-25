const rules = require("./rule");
const methods = require("../type/method");

const { ROLE, GPERM, PERM } = rules;
const { GET, POST, PATCH, DELETE } = methods;

const API = {
  AUTH: {
    LOGIN: {
      METHOD: POST,
      PATH: "/api/auth/login",
    },
  },
  PROVINCE: {
    GET: {
      METHOD: GET,
      PATH: "/api/provinces",
    },
  },
  USER: {
    GET: {
      METHOD: GET,
      PATH: "/api/users",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/users/:id",
      ACCESS: [],
    },
    CURR_USER: {
      METHOD: GET,
      PATH: "/api/users/me",
      ACCESS: [],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/users",
      ACCESS: [],
    },
    NEW_MANY: {
      METHOD: POST,
      PATH: "/api/users/many",
      ACCESS: [],
    },
    SET_ROLE: {
      METHOD: PATCH,
      PATH: "/api/users/role",
      ACCESS: [],
    },
    MOD_PROF: {
      METHOD: PATCH,
      PATH: "/api/users/profile",
      ACCESS: [],
    },
    ACCESS: {
      METHOD: PATCH,
      PATH: "/api/users/access/:id",
      ACCESS: [],
    },
    CHANGE_PASS: {
      METHOD: PATCH,
      PATH: "/api/users/password",
      ACCESS: [],
    },
  },
  ROLE: {
    GET: {
      METHOD: GET,
      PATH: "/api/roles",
      ACCESS: [ROLE.GET],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/roles/:id",
      ACCESS: [ROLE.GET],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/roles",
      ACCESS: [ROLE.NEW],
    },
    MOD: {
      METHOD: PATCH,
      PATH: "/api/roles/:id",
      ACCESS: [ROLE.MOD],
    },
    DEL: {
      METHOD: DELETE,
      PATH: "/api/roles/:id",
      ACCESS: [ROLE.DEL],
    },
  },
  GPERM: {
    GET: {
      METHOD: GET,
      PATH: "/api/group-permissions",
      ACCESS: [GPERM.GET],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/group-permissions/:id",
      ACCESS: [GPERM.GET],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/group-permissions",
      ACCESS: [GPERM.NEW],
    },
    MOD: {
      METHOD: PATCH,
      PATH: "/api/group-permissions/:id",
      ACCESS: [GPERM.MOD],
    },
    DEL: {
      METHOD: DELETE,
      PATH: "/api/group-permissions/:id",
      ACCESS: [GPERM.DEL],
    },
  },
  PERM: {
    GET: {
      METHOD: GET,
      PATH: "/api/permissions",
      ACCESS: [PERM.GET],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/permissions/:id",
      ACCESS: [PERM.GET],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/permissions",
      ACCESS: [PERM.NEW],
    },
    MOD: {
      METHOD: PATCH,
      PATH: "/api/permissions/:id",
      ACCESS: [PERM.MOD],
    },
    DEL: {
      METHOD: DELETE,
      PATH: "/api/permissions/:id",
      ACCESS: [PERM.DEL],
    },
  },
  SUBJECT: {
    GET: {
      METHOD: GET,
      PATH: "/api/subjects",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/subjects",
      ACCESS: [],
    },
    MOD: {
      METHOD: PATCH,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: DELETE,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
  },
  CLASS: {
    GET: {
      METHOD: GET,
      PATH: "/api/classes",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/classes",
      ACCESS: [],
    },
    ADD_MEMBERS: {
      METHOD: PATCH,
      PATH: "/api/classes/add-members/:id",
      ACCESS: [],
    },
    DELETE_MEMBERS: {
      METHOD: PATCH,
      PATH: "/api/classes/remove-members/:id",
      ACCESS: [],
    },
    UPDATE: {
      METHOD: PATCH,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
    DELETE: {
      METHOD: DELETE,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
  },
  CHANNEL: {
    GET: {
      METHOD: GET,
      PATH: "/api/channels",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/channels/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/channels",
      ACCESS: [],
    },
    ADD_MEMBERS: {
      METHOD: PATCH,
      PATH: "/api/channels/alloc-users/:id",
      ACCESS: [],
    },
    DELETE_MEMBERS: {
      METHOD: PATCH,
      PATH: "/api/channels/remove-users/:id",
      ACCESS: [],
    },
    UPDATE: {
      METHOD: PATCH,
      PATH: "/api/channels/:id",
      ACCESS: [],
    },
    DELETE: {
      METHOD: DELETE,
      PATH: "/api/channels/:id",
      ACCESS: [],
    },
  },
  COURSE: {
    GET: {
      METHOD: GET,
      PATH: "/api/courses",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: GET,
      PATH: "/api/courses/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: POST,
      PATH: "/api/courses",
      ACCESS: [],
    },
    MOD: {
      METHOD: PATCH,
      PATH: "/api/courses/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: DELETE,
      PATH: "/api/courses/:id",
      ACCESS: [],
    },
  },
};

module.exports = { API };
