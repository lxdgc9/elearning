"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Action;
(function (Action) {
    Action["read"] = "READ";
    Action["write"] = "WRITE";
    Action["modify"] = "MODIFY";
    Action["delete"] = "DELETE";
})(Action || (Action = {}));
const logSchema = new mongoose_1.default.Schema({
    action: {
        type: String,
        enum: [Action.read, Action.write, Action.modify, Action.delete],
        required: true,
        uppercase: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
    modBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    collection: "Log",
    timestamps: true,
    toJSON: {
        transform(_doc, ret, _options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
logSchema.statics.build = (attrs) => {
    return new Log(attrs);
};
const Log = mongoose_1.default.model("log", logSchema);
exports.Log = Log;
