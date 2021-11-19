const Router = require("koa-router");
const router = new Router();
const upload_controller = require("./../../app/controllers/upload_controller");
router.post("/upload/avatar", upload_controller.uploadAvatar);
module.exports = router;
