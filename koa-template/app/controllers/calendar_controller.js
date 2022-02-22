const uuidv1 = require("uuid/v1");
const { total_col, month_col } = require("./../models/calendar");
const qs = require("qs");
const moment = require("moment");
const { arrayRandomOne } = require("./../utils/util");
const { newData1, newData2 } = require("./data");

// 获取月度表现趋势数据
const getTrendMonthList = async (ctx, next) => {
  const url = ctx.request.url;
  const params = url.split("?")[1];
  const req = qs.parse(params);
  const dateData = ["2021-01-12:12:21:01"];
  const brandData = ["XIXI", "HAHA", "KAKA"];

  const newData = new Array(20).fill(1).map((item, i) => ({
    id: i,
    cmc_campaign_id: `ADG2021000${i + 1}`,
    campaign_name: "hhxx" + i,
    cmc_cmapaign_created_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    brand_name: arrayRandomOne(brandData),
    created_by: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  }));
  const data = await month_col.find({});

  const curData = (await data.length) > 0 ? data : month_col.create(newData);

  const result = {
    current: Number(req.current),
    pages: Math.ceil(curData.length / req.size),
    records:
      (curData &&
        !!curData.length &&
        curData.slice((req.current - 1) * req.size, req.current * req.size)) ||
      [],
    size: Number(req.size),
    total: curData.length,
  };

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "success",
    result,
  };
};

const getTrendData = async (ctx, next) => {
  const url = ctx.request.url;
  const params = url.split("?")[1];
  const req = qs.parse(params);

  const newData = await total_col.find({});
  let result =
    (await newData.length) > 0
      ? newData
      : total_col.create(req.classify === "YTD" ? newData1 : newData2);

  result = Array.isArray(result)
    ? result
    : req.classify === "YTD"
    ? newData1
    : newData2;
  const total = result
    .map((item) => item.total)
    .reduce((prev, cur) => prev + cur);
  const bmwTotal = result
    .filter((item) => item.brand === "XIXI")
    .map((item) => item.total)
    .reduce((prev, cur) => prev + cur);
  const miniTotal = result
    .filter((item) => item.brand === "HAHA")
    .map((item) => item.total)
    .reduce((prev, cur) => prev + cur);
  const motorradTotal = result
    .filter((item) => item.brand === "KAKA")
    .map((item) => item.total)
    .reduce((prev, cur) => prev + cur);
  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "success",
    result: {
      data: result,
      total: {
        mini_total: miniTotal,
        bmw_total: bmwTotal,
        motorrad_total: motorradTotal,
        total,
      },
    },
  };
};

module.exports = {
  getTrendMonthList,
  getTrendData,
};
