const config = require("./../../config");
const passport = require("./../utils/passport");
const User_col = require("./../models/user");
const Passport_col = require("./../models/password");
const uuidv1 = require("uuid/v1");
const qs = require("qs");

// 注册新建
const register = async (ctx, next) => {
  console.log(ctx, "dd");
  const req = ctx.request.body;
  console.log(req, "req");
  // 查看用户名是否重复
  const user = await User_col.findOne({
    username: req.username,
  });

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
          avatar: newUser.avatar,
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
        avatar: user.avatar,
      },
    };
  }
};
const getUser = async (ctx, next) => {
  const url = ctx.request.url;
  console.log(url, qs.parse(url.split("?").pop()));
  const user = await User_col.findOne(qs.parse(url.split("?").pop()));
  console.log(user, "dddduser");
  ctx.status = 200;
  const { userId, agreement, username, nickname, avatar, email } = user;
  ctx.body = {
    code: 1,
    msg: "success",
    result: {
      userId,
      agreement,
      username,
      nickname,
      avatar,
      email,
    },
  };
};
const getUsers = async (ctx, next) => {
  const params = ctx.request.url.split("?").pop();
  const req = qs.parse(params);
  console.log(req, "ddddrer");

  const reg = new RegExp(req.search, "i");

  const search = req.search
    ? {
        $or: [
          { username: { $regex: reg } },
          // { cmc_campaign_business_sector: { $regex: reg } },
        ],
      }
    : {};

  const users = await User_col.find(search);
  ctx.status = 200;

  const newUsers = users.map((item) => {
    const { nickname, username, userId, avatar, email } = item;
    return {
      nickname,
      username,
      userId,
      avatar,
      email,
    };
  });

  const result = {
    current: Number(req.current),
    pages: Math.ceil(users.length / req.size),
    records: newUsers.slice(
      (req.current - 1) * req.size,
      req.current * req.size
    ),
    size: Number(req.size),
    total: users.length,
  };

  ctx.body = {
    code: 1,
    msg: "success",
    result,
  };
};
const modifyUser = async (ctx, next) => {
  const req = ctx.request.body;

  const result = await User_col.updateOne(
    {
      userId: req.userId,
    },
    req
  );
  if (result.nModified === 1) {
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: "修改成功",
      result,
    };
  } else {
    ctx.body = {
      code: 0,
      msg: "修改失败",
    };
  }
};

module.exports = {
  register,
  login,
  modifyUser,
  getUser,
  getUsers,
};
