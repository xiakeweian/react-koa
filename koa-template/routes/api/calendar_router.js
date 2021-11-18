const Router = require("koa-router");
const router = new Router();
const calendar_controller = require("./../../app/controllers/calendar_controller");
router.get("/trend-total/data", calendar_controller.getTrendData);
router.get("/trend-month/list", calendar_controller.getTrendMonthList);
module.exports = router;
