const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleCateSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    articlecate: {
      type: String,
    },
    desc: {
      type: String,
    },
    create_time: {
      type: String,
    },
  },
  {
    collection: "articleCate",
    versionKey: false,
    // autoIndex: false,
    // timestamps: {
    //   createdAt: "created_at",
    //   updatedAt: "updated_at",
    // },
  }
);
const articleSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    cate_id: {
      type: String,
    },
    cate_name: {
      type: String,
    },
    author: {
      type: String,
    },
    author_id: {
      type: String,
    },
    content: {
      type: String,
    },
    create_time: {
      type: String,
    },
  },
  {
    collection: "article",
    versionKey: false,
    autoIndex: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const article_cate_col = mongoose.model(
  "articleCate",
  articleCateSchema,
  "articleCate"
);
const article_col = mongoose.model("article", articleSchema, "article");
module.exports = {
  article_cate_col,
  article_col,
};
