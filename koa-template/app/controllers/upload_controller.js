const fs = require("fs");
const uploadAvatar = async (ctx, next) => {
  console.log(ctx.request.body, ctx.request, "kkk");

  //   const file = ctx.request.body.files.file; // 获取上传文件
  //   console.log(ctx.request.body, ctx.request, "lllsss");
  //   const reader = fs.createReadStream(file.path); // 创建可读流
  //   const ext = file.name.split(".").pop(); // 获取上传文件扩展名
  //   console.log(file, reader, ext, "jsjsjsj");
  //   const upStream = fs.createWriteStream(
  //     `upload/${Math.random().toString()}.${ext}`
  //   ); // 创建可写流
  //   reader.pipe(upStream); // 可读流通过管道写入可写流
  //   ctx.status = 200;
  //   ctx.body = {
  //     code: 1,
  //     msg: "上传成功",
  //   };
};
module.exports = {
  uploadAvatar,
};
