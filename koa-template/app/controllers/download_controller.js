const path = require("path");
const send = require("koa-send");
const fs = require("fs");
const document_col = require("../models/document");
const excelExport = require("excel-export");
const config = require("../../config");
const moment = require("moment");
const uuidv1 = require("uuid/v1");
const excel = require("../utils/excel.js");
const downloadImg = async (ctx, next) => {
  console.log(ctx.req, "dddddctx");
  const urlObj = ctx.request.query;
  const filename = urlObj.url.split("/").pop();
  console.log(urlObj, filename, "kkkkks");
  ctx.attachment(filename);
  ctx.status = 200;
  console.log(urlObj, "urlObj");
  await send(ctx, urlObj.url);

  // 或者 ctx.set("Content-disposition", "attachment; filename=" + filename);
};

const downloadFileList = async (ctx) => {
  const fileData = await document_col.find({});
  var conf = {};
  //定义表头
  conf.cols = [
    { caption: "文件id", type: "number", width: 50 },
    { caption: "文件名称", type: "string", width: 40 },
    { caption: "文件更新时间", type: "string", width: 20 },
    { caption: "文件所属", type: "string", width: 40 },
  ];

  const array = [];
  fileData.map((item, ind) => {
    array[ind] = [item.id, item.file_name, item.update_time, item.file_owner];
  });
  conf.rows = array;
  conf.name = `sheet${uuidv1()}`;
  const result = excelExport.execute(conf);
  ctx.res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats;charset=utf-8"
  );
  const filename = `${encodeURIComponent(conf.name)}.xlsx`;
  ctx.res.setHeader("Content-Disposition", "attachment; filename=" + filename);

  excel.createExcel({
    data: conf,
    savePath: "static/excel/",
    cb: function (path) {
      excel.download(path, filename, ctx, true);
    },
  });
};

module.exports = {
  downloadImg,
  downloadFileList: downloadFileList,
};
