module.exports = {
  port: 3000, // 项目启动的端口
  db: "mongodb://localhost:27017/koa-template", // 数据库
  saltTimes: 3, // （用户密码加密）
  root_path: __dirname,
};
