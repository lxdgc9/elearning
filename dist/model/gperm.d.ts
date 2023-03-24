import { Document, Model, Types } from "mongoose";
interface GPermAttrs {
  name: string;
  permissions?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}
type GPermDoc = GPermAttrs & Document;
type GPermModel = Model<GPermDoc> & {
  build(attrs: GPermAttrs): GPermDoc;
};
declare const GPerm: GPermModel;
export { GPerm, GPermDoc };
