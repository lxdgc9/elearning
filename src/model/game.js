const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    type: {
      type: String,
      enum: ["personal", "team"],
      required: "personal",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    time: {
      type: Number,
      default: 0,
    },
    questionNum: {
      type: Number,
      default: 0,
    },
    quiz: [
      {
        question: {
          type: String,
        },
        answers: [
          {
            content: {
              type: String,
            },
            value: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    collection: "Game",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

schema.statics.build = (attrs) => {
  return new Game(attrs);
};

const Game = mongoose.model("game", schema);

module.exports = Game;
