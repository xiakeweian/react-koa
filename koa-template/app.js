const Koa = require("koa");
const config = require("./config");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const hotMiddleware = require("koa-webpack-middleware");
const mongoose = require("mongoose");
const KoaStaticCache = require("koa-static-cache");

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

const user_router = require("./routes/api/user_router");
const course_router = require("./routes/api/course_router");
const campaign_router = require("./routes/api/campaign_router");
const calendar_router = require("./routes/api/calendar_router");
const upload_router = require("./routes/api/upload_router");
app.use(user_router.routes()).use(user_router.allowedMethods());
app.use(course_router.routes()).use(course_router.allowedMethods());
app.use(campaign_router.routes()).use(campaign_router.allowedMethods());
app.use(calendar_router.routes()).use(calendar_router.allowedMethods());
app.use(upload_router.routes()).use(upload_router.allowedMethods());

app.listen(config.port);
