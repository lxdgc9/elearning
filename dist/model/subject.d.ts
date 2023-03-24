import { Document, Model, Types } from "mongoose";
interface SubAttrs {
  name: string;
  description?: string;
  teachers?: Types.ObjectId[];
  courses?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}
type SubDoc = SubAttrs & Document;
type SubModel = Model<SubDoc> & {
  build(attrs: SubAttrs): SubDoc;
};
declare const Subject: SubModel;
export { Subject, SubDoc };
