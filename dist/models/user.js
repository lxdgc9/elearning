"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "profile",
        required: true,
    },
    groupRole: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "group-role",
        required: true,
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "role",
    },
    logs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "log",
        },
    ],
}, {
    collection: "User",
    toJSON: {
        transform(_doc, ret, _options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
schema.statics.build = (attrs) => {
    return new User(attrs);
};
const User = mongoose_1.default.model("user", schema);
exports.User = User;
