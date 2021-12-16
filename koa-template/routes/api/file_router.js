const Router = require("koa-router");
const router = new Router();
const file_controller = require("./../../app/controllers/upload_controller");
router.get("/file/list", file_controller.fileList);
// router.get("/download/file-list", file_controller.fileList);

module.exports = router;
