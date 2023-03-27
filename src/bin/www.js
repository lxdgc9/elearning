#!/usr/bin/env node

import http from "http";

import dotenv from "dotenv";

import { app } from "../app";
import { connectDb } from "../db";
import { createSock } from "../sock";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET must be defined");
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET must be defined");
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const sv = http.createServer(app);

connectDb(process.env.MONGO_URI);

createSock(sv);

sv.listen(port);
sv.on("listening", onListening);
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

  const bind =
    typeof port === "string"
      ? "Pipe " + port
      : "Port " + port;

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
  const bind =
    typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr?.port;
  console.log("Listening on " + bind);
}
