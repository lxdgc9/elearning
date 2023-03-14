"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJwt(req, _res, next) {
    var _a;
    try {
        const token = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}
exports.verifyJwt = verifyJwt;
