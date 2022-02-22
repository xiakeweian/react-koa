const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CourseSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  { collection: "course", versionKey: false }
);

module.exports = mongoose.model("course", CourseSchema);
// module.exports = mongoose.model("Course", CourseSchema, "course");//默认操作course集合
// module.exports = mongoose.model("Course", CourseSchema); 默认会操作courses集合
