"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.API = void 0;
const method_1 = require("../type/method");
const perm_1 = require("./perm");
const API = {
  AUTH: {
    LOGIN: {
      METHOD: method_1.Method.POST,
      PATH: "/api/auth/login",
    },
  },
  USER: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/users",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/users/:id",
      ACCESS: [],
    },
    CURR_USER: {
      METHOD: method_1.Method.GET,
      PATH: "/api/users/me",
      ACCESS: [],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/users",
      ACCESS: [],
    },
    NEW_MANY: {
      METHOD: method_1.Method.POST,
      PATH: "/api/users/many",
      ACCESS: [],
    },
    SET_ROLE: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/users/role",
      ACCESS: [],
    },
    MOD_PROF: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/users/profile",
      ACCESS: [],
    },
    ACCESS: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/users/access/:id",
      ACCESS: [],
    },
    CHANGE_PASS: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/users/password",
      ACCESS: [],
    },
  },
  ROLE: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/roles",
      ACCESS: [perm_1.ROLE.GET],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/roles/:id",
      ACCESS: [perm_1.ROLE.GET],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/roles",
      ACCESS: [perm_1.ROLE.NEW],
    },
    MOD: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/roles/:id",
      ACCESS: [perm_1.ROLE.MOD],
    },
    DEL: {
      METHOD: method_1.Method.DELETE,
      PATH: "/api/roles/:id",
      ACCESS: [perm_1.ROLE.DEL],
    },
  },
  GPERM: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/group-permissions",
      ACCESS: [perm_1.GPERM.GET],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/group-permissions/:id",
      ACCESS: [perm_1.GPERM.GET],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/group-permissions",
      ACCESS: [perm_1.GPERM.NEW],
    },
    MOD: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/group-permissions/:id",
      ACCESS: [perm_1.GPERM.MOD],
    },
    DEL: {
      METHOD: method_1.Method.DELETE,
      PATH: "/api/group-permissions/:id",
      ACCESS: [perm_1.GPERM.DEL],
    },
  },
  PERM: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/permissions",
      ACCESS: [perm_1.PERM.GET],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/permissions/:id",
      ACCESS: [perm_1.PERM.GET],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/permissions",
      ACCESS: [perm_1.PERM.NEW],
    },
    MOD: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/permissions/:id",
      ACCESS: [perm_1.PERM.MOD],
    },
    DEL: {
      METHOD: method_1.Method.DELETE,
      PATH: "/api/permissions/:id",
      ACCESS: [perm_1.PERM.DEL],
    },
  },
  SUBJECT: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/subjects",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/subjects",
      ACCESS: [],
    },
    MOD: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: method_1.Method.DELETE,
      PATH: "/api/subjects/:id",
      ACCESS: [],
    },
  },
  CLASS: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/classes",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/classes",
      ACCESS: [],
    },
    ALLOC_USER: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/classes/alloc-users/:id",
      ACCESS: [],
    },
    REMOVE_USER: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/classes/remove-users/:id",
      ACCESS: [],
    },
    MOD: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: method_1.Method.DELETE,
      PATH: "/api/classes/:id",
      ACCESS: [],
    },
  },
  COURSE: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/courses",
      ACCESS: [],
    },
    GET_BY_ID: {
      METHOD: method_1.Method.GET,
      PATH: "/api/courses/:id",
      ACCESS: [],
    },
    NEW: {
      METHOD: method_1.Method.POST,
      PATH: "/api/courses",
      ACCESS: [],
    },
    MOD: {
      METHOD: method_1.Method.PATCH,
      PATH: "/api/courses/:id",
      ACCESS: [],
    },
    DEL: {
      METHOD: method_1.Method.DELETE,
      PATH: "/api/courses/:id",
      ACCESS: [],
    },
  },
  PROVINCE: {
    GET: {
      METHOD: method_1.Method.GET,
      PATH: "/api/provinces",
      ACCESS: [],
    },
  },
};
exports.API = API;
