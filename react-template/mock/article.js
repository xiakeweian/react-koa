import Mock from "mockjs";
export default {
  "GET /list": Mock.mock({
    code: 1,
    msg: "success",
    result: {
      current: 1,
      pages: 1,
      "records|1-10": [
        {
          id: "@integer(1,45)",
          // id: "@id",
          "articlecate|+1": ["国际新闻", "国内新闻", "太空新闻", "百姓新闻"],
          desc: "@cparagraph(1,3)",
          create_time: "@date",
          title: "@ctitle",
          content: "@cparagraph(1,3)",
          author: "@cname",
          cate_id: "@integer(1,45)",
          "cate_name|+1": ["国际新闻", "国内新闻", "太空新闻", "百姓新闻"],
        },
      ],
      size: 10,
      total: 10,
    },
  }),
};
