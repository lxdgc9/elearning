"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Log = void 0;
const mongoose_1 = require("mongoose");
const action_1 = require("../type/action");
const logSchema = new mongoose_1.Schema(
  {
    action: {
      type: String,
      enum: [
        action_1.Action.GET,
        action_1.Action.NEW,
        action_1.Action.MOD,
        action_1.Action.DEL,
      ],
      required: true,
      uppercase: true,
      trim: true,
    },
    modBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    collection: "Log",
    timestamps: true,
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
logSchema.statics.build = (attrs) => {
  return new Log(attrs);
};
const Log = (0, mongoose_1.model)("log", logSchema);
exports.Log = Log;
