const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DocumentSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    file_name: {
      type: String,
    },
    update_time: {
      type: Date,
    },
    file_owner: {
      type: String,
    },
  },
  { collection: "document", versionKey: false }
);
module.exports = mongoose.model("document", DocumentSchema);
