#!/usr/bin/env ts-node

import { config } from "dotenv";
import { createServer } from "http";
import { app } from "../app";
import { connectDb } from "../db";

config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be defined");
}
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET must be defined");
}
if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET must be defined");
}

const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

const sv = createServer(app);

connectDb(process.env.MONGO_URI)
  .then(() => {
    sv.listen(port);
    sv.on("listening", onListening);
  })
  .catch((err) => {
    console.log(err);
  });

sv.on("error", onError);

function normalizePort(val: string): string | number | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(err: NodeJS.ErrnoException): void {
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

function onListening(): void {
  const addr = sv.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log("Listening on " + bind);
}
