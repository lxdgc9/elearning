import mongoose from "mongoose";
import { Gender } from "../@types/gender";

interface ProfAttrs {
  fullName: string;
  dob: Date;
  gender: string;
  email?: string;
  phone?: string;
  logs?: mongoose.Types.ObjectId[];
}

type ProfDoc = ProfAttrs & mongoose.Document;

type ProfModel = mongoose.Model<ProfDoc> & {
  build(attrs: ProfAttrs): ProfDoc;
};

const schema = new mongoose.Schema<ProfAttrs>(
  {
    fullName: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
      uppercase: true,
      trim: true,
      default: Gender.OTHER,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log",
      },
    ],
  },
  {
    collection: "Profile",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.statics.build = (attrs: ProfAttrs) => {
  return new Prof(attrs);
};

// Remove extra spaces from a string
schema.pre("save", function (next) {
  this.fullName = this.fullName.replace(/\s+/g, " ").trim();
  next();
});

const Prof = mongoose.model<ProfDoc, ProfModel>("profile", schema);

export { Prof };
