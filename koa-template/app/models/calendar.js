const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      unique: true,
    },
    // start_time: {
    //   type: String,
    // },
    // end_time: {
    //   type: String,
    // },
  },
  { collection: "totalTrend", versionKey: false }
);
// {id:'sss',brand:'bmw',classify:'ytd',time:'2021-01-11',total:24}

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
  { collection: "monthTrend", versionKey: false }
);
const total_col = mongoose.model("totalrend", totalSchema);
const month_col = mongoose.model("monthTrend", monthSchema);
module.exports = {
  total_col,
  month_col,
};
