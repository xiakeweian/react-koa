const config = require("./../../config");
const passport = require("./../utils/passport");
const User_col = require("./../models/user");
const Passport_col = require("./../models/password");
const uuidv1 = require("uuid/v1");

// 注册
const register = async (ctx, next) => {
  console.log(ctx, "dd");
  const req = ctx.request.body;
  console.log(req, "req");
  // 查看用户名是否重复
  const user = await User_col.findOne({
    username: req.username,
  });
  console.log(user, "ddduser");

  ctx.status = 200;
  if (user) {
    ctx.body = {
      code: 0,
      msg: "用户名重复！",
    };
    return;
  }

  // 插入新用户
  const userId = uuidv1();
  const newUser = await User_col.create({
    userId,
    ...req,
  });

  if (newUser) {
    // 加密
    const hash = await passport.encrypt(req.password, config.saltTimes);
    const result = await Passport_col.create({
      userId: userId,
      hash,
    });

    if (result) {
      ctx.body = {
        code: 1,
        msg: "注册成功！",
        data: {
          userId: newUser.userId,
          username: newUser.username,
          email: newUser.email,
          nickName: newUser.nickName,
        },
      };
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "注册失败！",
    };
  }
};
const login = async (ctx, next) => {
  const req = ctx.request.body;
  const user = await User_col.findOne({
    username: req.username,
  });

  if (!user) {
    ctx.body = {
      code: 0,
      msg: "用户名不存在",
    };
  } else if (user.password !== req.password) {
    ctx.body = {
      code: 0,
      msg: "用户密码错误",
    };
  } else {
    ctx.body = {
      code: 1,
      msg: "登录成功",
      data: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }
};

module.exports = {
  register,
  login,
};
