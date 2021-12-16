const Router = require("koa-router");
const router = new Router();
const path = require("path");

const multer = require("koa-multer");
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./../../static/uploads"));
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split(".")[1];
    cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});
//文件上传限制
const limits = {
  fields: 10, //非文件字段的数量
  fileSize: 5000 * 1024, //文件大小 单位 b
  files: 1, //文件数量
};
const upload = multer({ storage, limits });
const upload_controller = require("./../../app/controllers/upload_controller");
router.post(
  "/upload/avatar",
  upload.single("file"),
  upload_controller.uploadAvatar
);
router.post(
  "/file/upload",
  upload.single("file"),
  upload_controller.uploadFile
);
module.exports = router;
