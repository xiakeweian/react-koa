const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      require: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    agreement: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    nickname: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { collection: "user", versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);
