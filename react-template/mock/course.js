import Mock from "mockjs";

const price = Mock.mock({
  "number|1-100": 100,
});
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
          brand: "@ctitle",
          ...Mock.mock({
            "price|1-100": 100,
          }),
          number: 1,
        },
      ],
      size: 10,
      total: 10,
    },
  }),
};
