"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTER_CFG = void 0;
var METHODS;
(function (METHODS) {
    METHODS["GET"] = "get";
    METHODS["POST"] = "post";
    METHODS["PATCH"] = "patch";
    METHODS["DELETE"] = "delete";
})(METHODS || (METHODS = {}));
const ROUTER_CFG = {
    API: {
        USERS: {
            GET_USERS: {
                METHOD: METHODS.GET,
                PATH: "/api/users",
            },
            GET_USER_BY_ID: {
                METHOD: METHODS.GET,
                PATH: "/api/users/:id",
            },
            NEW_USER: {
                METHOD: METHODS.POST,
                PATH: "/api/users",
            },
        },
    },
};
exports.ROUTER_CFG = ROUTER_CFG;
