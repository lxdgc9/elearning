"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    logs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "log",
            required: true,
        },
    ],
}, {
    collection: "Role",
    toJSON: {
        transform(_doc, ret, _options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
    timestamps: true,
});
schema.statics.build = (attrs) => {
    return new Role(attrs);
};
const Role = mongoose_1.default.model("role", schema);
exports.Role = Role;
