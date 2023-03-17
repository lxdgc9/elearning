import { Document, model, Model, Schema, Types } from "mongoose";
import { Action } from "../type/action";

interface LogAttrs {
  action: Action;
  modBy: Types.ObjectId;
}

type LogDoc = LogAttrs & Document;

type LogModel = Model<LogDoc> & {
  build(attrs: LogAttrs): LogDoc;
};

const logSchema = new Schema<LogAttrs>(
  {
    action: {
      type: String,
      enum: [Action.GET, Action.NEW, Action.MOD, Action.DEL],
      required: true,
      uppercase: true,
      trim: true,
    },
    modBy: {
      type: Schema.Types.ObjectId,
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

logSchema.statics.build = (attrs: LogAttrs) => {
  return new Log(attrs);
};

const Log = model<LogDoc, LogModel>("log", logSchema);

export { Log, LogDoc };
