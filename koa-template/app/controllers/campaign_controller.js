const uuidv1 = require("uuid/v1");
const { campaign_col, create_col } = require("./../models/campaign");
const formatDate = require("./../utils/formatDate");
const qs = require("qs");
const moment = require("moment");

const fetchList = async (ctx, next) => {
  const body = ctx.request.body;
  const params = ctx.request.url.split("?")[1];
  const req = qs.parse(params);

  const reg = new RegExp(req.search, "i");
  const search = req.search
    ? {
        $or: [{ name: { $regex: reg } }, { brand: { $regex: reg } }],
      }
    : {};
  const campaign = await campaign_col.find(search);

  const result = {
    current: Number(req.current),
    pages: Math.ceil(campaign.length / req.size),
    records: campaign.slice(
      (req.current - 1) * req.size,
      req.current * req.size
    ),
    size: Number(req.size),
    total: campaign.length,
  };

  if (campaign) {
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "success",
      result,
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: "参数错误！",
    };
  }
};

const getCampaignId = async (ctx, next) => {
  const req = ctx.request.body;

  const campaign = await campaign_col.find({});
  const campaignIds = campaign
    .map((item) => item.campaign_id)
    .map((item) => item.slice(6))
    .sort((a, b) => b - a);
  create_col.create({
    campaign_id:
      campaignIds && campaignIds.length > 0
        ? `CMC000${campaignIds[0] + 1}`
        : "CMC0001",
    id: uuidv1(),
    create_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  });

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "success",
    result: { id: campaign_id },
  };
};

const create = async (ctx, next) => {
  const req = ctx.request.body;

  if (!req.id) {
    //新建
    const data = {
      id: uuidv1(),
      child_activity_count: 0,
      team: "团队" + uuidv1(),
      created_by: "admin",
      modify_time: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      ...req,
    };
    const result = await campaign_col.create(data);
    console.log(result, "ddddresult");

    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "success",
      result,
    };
  } else {
    //更新
    const result = await campaign_col.updateOne(
      {
        id: req.id,
      },
      { ...req, modify_time: moment(new Date()).format("YYYY-MM-DD hh:mm:ss") }
    );

    ctx.status = 200;
    if (result.nModified === 1) {
      ctx.body = {
        code: 1,
        msg: "modify successful!",
      };
    } else {
      ctx.body = {
        code: 0,
        msg: "modify failed!",
      };
    }
  }
};
const getCampaignDetail = async (ctx, next) => {
  const url = ctx.request.url;
  console.log(url, "dddd");
  const params = url.split("?")[1];
  const req = qs.parse(params);
  console.log(req, "dddd");
  const result = await campaign_col.findOne({ id: req.id });
  console.log(result, "ddddsss");
  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "success",
    result,
  };
};
// 删除单个campaign
const deleteCampaign = async (ctx, next) => {
  const req = ctx.request.body;
  const result = await campaign_col.remove({ id: req.id });
  if (result.n === 1) {
    ctx.status === 200;
    ctx.body = {
      code: 1,
      msg: "删除成功！",
    };
  } else {
    ctx.body = {
      code: 0,
      msg: "删除失败!",
    };
  }
};

module.exports = {
  fetchList,
  create,
  getCampaignDetail,
  getCampaignId,
  deleteCampaign,
};
