const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CourseSchema = new Schema(
  {
    id: {
      type: String,
      unique: true, //id唯一
      required: true, //必填项
    },
    name: {
      type: String,
      required: true,
      trim: true, //name字段左右去掉空格
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      default: 0, //默认值
    },
    number: {
      type: Number,
    },
  },
  { collection: "course", versionKey: false }
);
CourseSchema.static.findById = function (id, cb) {
  this.find({ _id: id }, function (err, doc) {
    cb(err, doc);
  });
};
const courseModel = mongoose.model("course", CourseSchema);

module.exports = courseModel;
// module.exports = mongoose.model("Course", CourseSchema, "course");//默认操作course集合
// module.exports = mongoose.model("Course", CourseSchema); 默认会操作courses集合
