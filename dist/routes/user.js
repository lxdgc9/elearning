"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const routes_cfg_1 = require("../routes-cfg");
const r = (0, express_1.Router)();
exports.userRouter = r;
r[routes_cfg_1.ROUTER_CFG.API.USERS.GET_USERS.METHOD](routes_cfg_1.ROUTER_CFG.API.USERS.GET_USERS.PATH, (req, res) => {
    res.send("Hello World");
});
