import { Document, Model, Types } from "mongoose";
interface ClassAttrs {
  name: string;
  session: string;
  description?: string;
  users?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}
type ClassDoc = ClassAttrs & Document;
type ClassModel = Model<ClassDoc> & {
  build(attrs: ClassAttrs): ClassDoc;
};
declare const Class: ClassModel;
export { Class, ClassDoc };
