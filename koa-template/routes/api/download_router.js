const Router = require("koa-router");
const router = new Router();
const path = require("path");
const download_controller = require("./../../app/controllers/download_controller");
// const course_controller = require('./../../app/controllers/course_controller');

router.get("/download/userImg", download_controller.downloadImg);
router.get("/download/file-list", download_controller.downloadFileList);

module.exports = router;
