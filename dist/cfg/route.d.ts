import { Method } from "../type/method";
declare const API: {
  AUTH: {
    LOGIN: {
      METHOD: Method;
      PATH: string;
    };
  };
  USER: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    CURR_USER: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    NEW_MANY: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    SET_ROLE: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    MOD_PROF: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    ACCESS: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    CHANGE_PASS: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
  };
  ROLE: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    MOD: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    DEL: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
  };
  GPERM: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    MOD: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    DEL: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
  };
  PERM: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    MOD: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
    DEL: {
      METHOD: Method;
      PATH: string;
      ACCESS: string[];
    };
  };
  SUBJECT: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    MOD: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    DEL: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
  };
  CLASS: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    ALLOC_USER: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    REMOVE_USER: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    MOD: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    DEL: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
  };
  COURSE: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    GET_BY_ID: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    NEW: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    MOD: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
    DEL: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
  };
  PROVINCE: {
    GET: {
      METHOD: Method;
      PATH: string;
      ACCESS: never[];
    };
  };
};
export { API };
