const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const Schema = mongoose.Schema;
const CampaignSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    campaign_id: {
      type: String,
    },
    campaign_name: {
      type: String,
    },
    campaign_en_name: {
      type: String,
    },
    cmc_campaign_business_sector: {
      type: String,
    },
    cmc_campaign_year: {
      type: String,
    },
    campaign_status: {
      type: Number,
    },
    created_by: {
      type: String,
    },
    team: {
      type: String,
    },
    child_activity_count: {
      type: String,
    },
    modify_time: {
      type: String,
    },
  },
  {
    collection: "campaign",
    versionKey: false,
    autoIndex: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
CampaignSchema.add({ newId: Number });

//创建campaignId
const mainCampaignIdSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    campaign_id: {
      type: String,
    },
  },
  {
    collection: "campaignId",
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const campaign_col = mongoose.model("campaign", CampaignSchema);
const create_col = mongoose.model("campaignId", mainCampaignIdSchema);

module.exports = {
  campaign_col,
  create_col,
};
