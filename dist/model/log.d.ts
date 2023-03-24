import { Document, Model, Types } from "mongoose";
import { Action } from "../type/action";
interface LogAttrs {
  action: Action;
  modBy: Types.ObjectId;
}
type LogDoc = LogAttrs & Document;
type LogModel = Model<LogDoc> & {
  build(attrs: LogAttrs): LogDoc;
};
declare const Log: LogModel;
export { Log, LogDoc };
