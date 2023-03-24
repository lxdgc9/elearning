import { Document, Model, Types } from "mongoose";
interface RoleAttrs {
  name: string;
  description?: string;
  permissions?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}
type RoleDoc = RoleAttrs & Document;
type RoleModel = Model<RoleDoc> & {
  build(attrs: RoleAttrs): RoleDoc;
};
declare const Role: RoleModel;
export { Role, RoleDoc };
