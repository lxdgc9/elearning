#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("../app");
const db_1 = require("../db");
const port = normalizePort(process.env.PORT || "3000");
app_1.app.set("port", port);
const sv = http_1.default.createServer(app_1.app);
// Connect to MongoDb
(0, db_1.connectDb)(process.env.MONGO_URI || "mongodb://localhost:27017/eln")
    .then(() => {
    sv.listen(port);
    sv.on("listening", onListening);
})
    .catch((err) => {
    console.log(err);
});
sv.on("error", onError);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(err) {
    if (err.syscall !== "listen") {
        throw err;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (err.code) {
        case "EACCES":
            console.log(bind + " requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            console.log(bind + " is already in use");
            process.exit(1);
        default:
            throw err;
    }
}
function onListening() {
    const addr = sv.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + (addr === null || addr === void 0 ? void 0 : addr.port);
    console.log("Listening on " + bind);
}
