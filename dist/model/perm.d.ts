import { Document, Model, Types } from "mongoose";
interface PermAttrs {
  name: string;
  groupId: Types.ObjectId;
  description?: string;
  logs?: Types.ObjectId[];
}
type PermDoc = PermAttrs & Document;
type PermModel = Model<PermDoc> & {
  build(attrs: PermAttrs): PermDoc;
};
declare const Perm: PermModel;
export { Perm, PermDoc };
