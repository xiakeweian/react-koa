const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuid/v1");
const document_col = require("../models/document");
const moment = require("moment");
const uploadAvatar = async (ctx, next) => {
  if (ctx.req.file) {
    const { filename } = ctx.req.file;
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "上传成功",
      result: {
        url: `/static/uploads/${filename}`,
        filename,
      },
    };
  } else {
    ctx.body = {
      code: 0,
      msg: "上传失败",
    };
  }
};
const fileTypeObj = {
  xlsx: "Excel",
  xls: "Excel",
  docx: "Word",
  doc: "Word",
  pdf: "PDF",
  pptx: "PPT",
  png: "Image",
  jpg: "Image",
  jpeg: "Image",
  mp4: "Video",
  mov: "Video",
};
const uploadFile = async (ctx, next) => {
  if (ctx.req.file) {
    const { filename, originalname } = ctx.req.file;
    const suffix = originalname.split(".").pop();
    const params = {
      id: uuidv1(),
      file_name: originalname,
      update_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      file_owner: fileTypeObj[suffix],
    };
    const result = await document_col.create(params);
    console.log(result, "kkkkfff");
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "上传成功",
    };
  } else {
    ctx.body = {
      code: 0,
      msg: "上传失败",
    };
  }
};
const fileList = async (ctx, next) => {
  const query = ctx.query;
  // const reg = new RegExp(query.search, "i");
  // const search = req.search
  //   ? {
  //       $or: [
  //         { campaign_name: { $regex: reg } },
  //         { cmc_campaign_business_sector: { $regex: reg } },
  //       ],
  //     }
  //   : {};
  const fileList = await document_col.find({}).sort("-update_time");
  const result = {
    current: Number(query.current),
    pages: Math.ceil(fileList.length / query.size),
    records: fileList.slice(
      (query.current - 1) * query.size,
      query.current * query.size
    ),
    size: Number(query.size),
    total: fileList.length,
  };
  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: "success",
    result: result,
  };
};

module.exports = {
  uploadAvatar,
  uploadFile,
  fileList,
};
