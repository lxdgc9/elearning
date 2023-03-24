import { Document, Model, Types } from "mongoose";
interface CourseAttrs {
  name: string;
  author: Types.ObjectId;
  subject: Types.ObjectId;
  classes: Types.ObjectId[];
  description?: string;
  lessons?: Types.ObjectId[];
  publish?: boolean;
  logs?: Types.ObjectId[];
}
type CourseDoc = CourseAttrs & Document;
type CourseModel = Model<CourseDoc> & {
  build(attrs: CourseAttrs): CourseDoc;
};
declare const Course: CourseModel;
export { Course, CourseDoc };
