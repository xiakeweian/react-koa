const fs = require("fs");
const uploadAvatar = async (ctx, next) => {
  if (ctx.req.file) {
    const { filename, url, mimetype, path } = ctx.req.file;
    console.log(ctx.req, "dddddreq");
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "上传成功",
      result: {
        // fileUrl:url.split('/react-koa/')[1],
        url: `/static/uploads/${filename}`,
        filename,
        // ...ctx.req.file,
      },
    };
  } else {
    ctx.body = {
      code: 0,
      msg: "上传失败",
    };
  }
};
module.exports = {
  uploadAvatar,
};
