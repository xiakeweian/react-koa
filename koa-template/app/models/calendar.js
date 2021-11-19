const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1");
const totalSchema = new Schema(
  {
    date: {
      type: String,
    },
    total: {
      type: Number,
    },
    brand: {
      type: String,
    },
    id: {
      type: Number,
      required: true,
      index: true,
      unique: true,
      // default: uuidv1(),
    },
  },
  {
    collection: "totalTrend",
    versionKey: false,
    autoIndex: false,
    _id: false,
    id: false,
  }
);

const monthSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    cmc_campaign_id: {
      type: String,
    },
    campaign_name: {
      type: String,
    },
    cmc_cmapaign_created_time: {
      type: String,
    },
    brand_name: {
      type: String,
    },
    created_by: {
      type: String,
    },
  },
  {
    collection: "monthTrend",
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      _id: false,
      id: false,
    },
  }
);

// 通过Schema创建Model，通过Model才能对数据库进行操作，集合名和Schema一一映射
const total_col = mongoose.model("totalrend", totalSchema);
const month_col = mongoose.model("monthTrend", monthSchema);

module.exports = {
  total_col,
  month_col,
};
