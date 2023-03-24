"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.PERM = exports.GPERM = exports.ROLE = void 0;
const ROLE = {
  GET: "READ_ROLE",
  NEW: "CREATE_ROLE",
  MOD: "UPDATE_ROLE",
  DEL: "DELETE_ROLE",
};
exports.ROLE = ROLE;
const GPERM = {
  GET: "READ_GPERM",
  NEW: "CREATE_GPERM",
  MOD: "UPDATE_GPERM",
  DEL: "DELETE_GPERM",
};
exports.GPERM = GPERM;
const PERM = {
  GET: "READ_PERM",
  NEW: "CREATE_PERM",
  MOD: "UPDATE_PERM",
  DEL: "DELETE_PERM",
};
exports.PERM = PERM;
