"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRole = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    roles: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "role",
        },
    ],
    logs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "log",
        },
    ],
}, {
    collection: "Group Role",
    toJSON: {
        transform(_doc, ret, _options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
schema.statics.build = (attrs) => {
    return new GRole(attrs);
};
const GRole = mongoose_1.default.model("group-role", schema);
exports.GRole = GRole;
