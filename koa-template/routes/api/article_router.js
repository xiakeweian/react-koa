const Router = require("koa-router");
const router = new Router();
const article_controller = require("./../../app/controllers/article_controller");

router.get("/list", article_controller.list);
router.post("/article", article_controller.create);
router.put("/article", article_controller.modify);
router.delete("/article", article_controller.del);

module.exports = router;