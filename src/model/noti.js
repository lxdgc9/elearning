const { Schema, model } = require("mongoose");

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  data: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  collection: 'Notification',
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

schema.index({ user: 1, createdAt: -1 });

const Noti = model("noti", schema);

module.exports = Noti;
