"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Gender;
(function (Gender) {
    Gender["male"] = "MALE";
    Gender["female"] = "FEMALE";
    Gender["other"] = "OTHER";
})(Gender || (Gender = {}));
const schema = new mongoose_1.default.Schema({
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
        enum: [Gender.male, Gender.female, Gender.other],
        uppercase: true,
        trim: true,
        default: Gender.other,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "log",
        },
    ],
}, {
    collection: "Profile",
    toJSON: {
        transform(_doc, ret, _options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
schema.statics.build = (attrs) => {
    return new Profile(attrs);
};
// Remove extra spaces from a string
schema.pre("save", function (next) {
    this.fullName = this.fullName.replace(/\s+/g, " ").trim();
    next();
});
const Profile = mongoose_1.default.model("profile", schema);
exports.Profile = Profile;
