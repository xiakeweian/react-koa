const Koa = require("koa");
const config = require("./config");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const KoaStaticCache = require("koa-static-cache");
const fs = require("fs");

const app = new Koa();

mongoose.connect(
  config.db,
  { useNewUrlParser: true, keepAlive: 120 },
  (err) => {
    if (err) {
      console.error("Failed to connect to database");
    } else {
      console.log("Connecting database successfully");
    }
  }
);

app.use(cors());
app.use(bodyParser());

// 静态资源处理
app.use(
  KoaStaticCache("./static", {
    prefix: "/static",
    dynamic: true,
    gzip: true,
  })
);

// 遍历 取代以上数据
function routers() {
  const files = fs.readdirSync(__dirname + "/routes/api");
  const js_files = files.filter((f) => {
    return f.endsWith(".js");
  });
  for (let f of js_files) {
    const mapping = require(__dirname + "/routes/api/" + f);
    app.use(mapping.routes()).use(mapping.allowedMethods());
  }
}
routers();

app.listen(config.port);
