import Mock from "mockjs";
export default {
  "POST /course": Mock.mock({
    code: 1,
    msg: "success",
    result: {
      current: 1,
      pages: 1,
      records: [{}],
      "records|1-10": [
        {
          id: "444443",
          "name|+1": ["Hello", "Mock.js", "!"],
        },
      ],
      size: 10,
      total: 10,
    },
  }),
};
