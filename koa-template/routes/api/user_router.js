const Router = require("koa-router");
const router = new Router();
const user_controller = require("./../../app/controllers/user_controller");

router.post("/user", user_controller.register);
router.post("/login", user_controller.login);
router.put("/user", user_controller.modifyUser);
router.get("/user", user_controller.getUser);
router.get("/users", user_controller.getUsers);

module.exports = router;
