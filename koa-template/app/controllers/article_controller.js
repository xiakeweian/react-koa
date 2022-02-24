const uuidv1 = require("uuid/v1");
const { article_cate_col, article_col } = require("./../models/article");
const moment = require("moment");

const list = async (ctx, next) => {
  console.log(ctx, ctx.req, ctx.request.query, "ddd");
  const { type, ...restQuery } = ctx.request.query;
  const query = ctx.request.query;
  const data = await (type === "cate"
    ? article_cate_col
        .find({})
        .skip(Number(query.current - 1) * Number(query.size))
        .limit(Number(query.size))
    : article_col.find({})
  )
    .skip(Number(query.current - 1) * Number(query.size))
    .limit(Number(query.size));

  const total = await (type === "cate"
    ? article_cate_col.find({}).countDocuments()
    : article_col.find({}).countDocuments());
  // 多表关联
  article_col.aggregate(
    [
      {
        $lookup: {
          from: "articleCate",
          localField: "articlecate",
          foreignField: "id",
          as: "cate",
        },
        $lookup: {
          from: "user",
          localField: "author_id",
          foreignField: "userId",
          as: "user",
        },
      },
    ],
    function (err, docs) {
      console.log(JSON.stringify(docs), "fffff");
    }
  );

  if (data.length > 0) {
    ctx.status = 200;
    const result = {
      current: Number(query.current),
      pages: Math.ceil(total / query.size),
      records: data,
      size: Number(query.size),
      total: total,
    };
    ctx.body = {
      code: 1,
      msg: "success",
      result,
    };
  }
};
const create = async (ctx, next) => {
  console.log(ctx.request.body, "sss");
  const { type, ...restParams } = ctx.request.body;

  if (type === "cate") {
    const { articlecate, desc } = restParams;
    if (!articlecate) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: "文章类别名称不能为空",
      };
    }

    const data = await article_cate_col.find({});
    const isExist = data.some((item) => item.articlecate === articlecate);
    if (isExist) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: "文章类别名称已存在",
      };
    } else {
      const result = await article_cate_col.create({
        id: uuidv1(),
        create_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        articlecate,
        desc,
      });
      ctx.status = 200;
      ctx.body = {
        code: 1,
        msg: "success",
        result,
      };
      console.log(result, "result");
    }
  } else {
    const { title, articlecate, ...rest } = restParams;

    if (!articlecate || !title) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: "缺少必要参数",
      };
    }

    const data = await article_col.find({});
    const isExist = data.some((item) => item.title === title);
    if (isExist) {
      ctx.status = 200;
      ctx.body = {
        code: 0,
        msg: "标题已存在",
      };
    } else {
      const result = await article_col.create({
        id: uuidv1(),
        create_time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        title,
        articlecate,
        ...rest,
      });
      console.log(result, "gggddddd");
      ctx.status = 200;
      ctx.body = {
        code: 1,
        msg: "success",
        result,
      };
    }
  }
};
const modify = async (ctx, next) => {};
const del = async (ctx, next) => {};

module.exports = {
  list,
  create,
  modify,
  del,
};
