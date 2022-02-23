const uuidv1 = require("uuid/v1");
const { campaign_col, create_col } = require("./../models/campaign");
const formatDate = require("./../utils/formatDate");
const qs = require("qs");
const moment = require("moment");

const fetchList1 = async (ctx, next) => {
  const body = ctx.request.body;
  const params = ctx.request.url.split("?")[1];
  const req = qs.parse(params);
  const reg = new RegExp(req.search, "i");
  const search = req.search
    ? {
        $or: [
          { campaign_name: { $regex: reg } },
          { cmc_campaign_business_sector: { $regex: reg } },
        ],
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
const fetchList = async (ctx, next) => {
  const query = ctx.request.query;
  console.log(query, "ddd");
  const reg = new RegExp(query.search, "i");
  const search = query.search
    ? {
        $or: [
          { campaign_name: { $regex: reg } },
          { cmc_campaign_business_sector: { $regex: reg } },
        ],
      }
    : {};

  const total = await campaign_col.find(search).count();

  const campaign2 = await campaign_col
    .find(search)
    .skip(Number(query.current - 1) * Number(query.size))
    .limit(Number(query.size));

  const result = {
    current: Number(query.current),
    pages: Math.ceil(total / query.size),
    records: campaign2,
    size: Number(query.size),
    total: total,
  };

  if (campaign2) {
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
    .map((item) => item && item.slice(6))
    .sort((a, b) => b - a);
  const campaign_id = await create_col.create({
    campaign_id:
      campaignIds && campaignIds.length > 0
        ? `ABC000${Number(campaignIds[0]) + 1}`
        : "ABC0001",
    id: uuidv1(),
    create_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  });

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "success",
    result: { id: campaign_id.campaign_id },
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

    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "success",
      result,
    };
  } else {
    // //更新
    const result = await campaign_col.updateOne(
      {
        _id: req.id,
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
  // const result = await campaign_col.findOne({ _id: req.id });
  const result = await campaign_col.findOne({ _id: req.id });
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
  const result = await campaign_col.deleteOne({ id: req.id });
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
