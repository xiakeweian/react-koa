var MongoClient = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/test";
const arrayRandomOne = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
//插入一条
// MongoClient.connect(DB_CONN_STR, function (err, db) {
//   console.log("连接成功！");
// if (err) throw err;
//   const mydb = db.db("test");
//   mydb.collection("person").insertOne({
//     course: "张三",
//     age: "20",
//     sex: "男",
//   });
// });

// 插入多条数据
// MongoClient.connect(DB_CONN_STR, function (err, db) {
//   if (err) throw err;
//   console.log("连接成功！");
//   const mydb = db.db("test");
//   const personArr = [];
//   const ages = [
//     20, 32, 40, 19, 54, 70, 39, 12, 33, 78, 45, 12, 45, 22, 32, 31, 80, 40, 43,
//     30, 21, 24, 25, 26, 29, 63, 76, 10, 13, 15, 18, 23,
//   ];
//   const names = [
//     "章三",
//     "里斯",
//     "玲玲",
//     "嬛嬛",
//     "妮妮",
//     "大暑",
//     "小暑",
//     "露水",
//     "酷暑",
//     "惊蛰",
//     "谷雨",
//     "雨水",
//     "小雪",
//     "大雪",
//     "芒种",
//   ];
//   for (let i = 0; i < 100; i++) {
//     personArr.push({
//       name: arrayRandomOne(names),
//       age: arrayRandomOne(ages),
//       sex: i % 2 === 0 ? "男" : "女",
//       id: i,
//     });
//   }
//   mydb.collection("person").insertMany(personArr);
// });
// 查询数据：
// 1.查询全部:
// MongoClient.connect(DB_CONN_STR,  function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");
//   const mydb = db.db("test");
//   mydb
//     .collection("person")
//     .find({})
//     .toArray(function (err, result) {
//       console.log(result, "kkkk");
//     });
//   console.log(personData);
// });
// 2.$or

// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");
//   const mydb = db.db("test");
//   mydb
//     .collection("person")
//     .find({ name: "章三", $or: [{ sex: "男" }] })
//     .toArray(function (err, result) {
//       console.log(result, result.length, "dddd");
//     });
// });

// 3.$gt,$lt,$gte,$lte

// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");
//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .find({ name: "章三", $or: [{ age: { $gt: 30, $lt: 80 } }] })
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// mydb
//   .collection("person")
//   .find({ name: "章三", $or: [{ age: { $gte: 30, $lte: 80 } }] })
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// });
// 4.limit 限制查询几条
// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");
//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .find({ name: "章三", $or: [{ sex: "男" }] })
//   .limit(2)
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// });
// 5.skip跳过几条
// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");

//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .find({ name: "章三" })
//   .skip(5)
//   .limit(10)
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// });
// 6.sort

// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");

//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .find({ name: "章三" })
//   .skip(5)
//   .limit(10)
//   .sort({ age: -1 })
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// });

// 7.$in,$nin
// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");

//   //   db.person.find({age:{$in:[19,20,23,24]}})
//   // db.person.find({id:{$nin:[1,2,3,4]}});

//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .find({ age: { $in: [19, 80, 67, 73, 24, 18, 12, 10, 15] } })
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// mydb
//   .collection("person")
//   .find({ age: { $nin: [19, 80, 67, 73, 24, 18, 12, 10, 15] } })
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// });

// 8.$exists 是否存在某个字段

// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");

//   const mydb = db.db("test");

// mydb
//   .collection("person")
//   .find({ content: { $exists: true } })
//   .toArray(function (err, result) {
//     console.log(result, result.length, "dddd");
//   });
// });

// 更新一条数据
// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");

//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .updateOne({ age: 20 }, { $set: { content: "我是新增加的content字段" } });
// });
// 更新多条数据
// MongoClient.connect(DB_CONN_STR, function (err, db) {
// if (err) throw err;
//   console.log("连接成功！");

//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .updateMany(
//     { age: 30 },
//     { $set: { content: "我是新增加的content字段", modify: 1 } }
//   );
// });

// 删除一条数据

// MongoClient.connect(DB_CONN_STR, function (err, db) {
//   if (err) throw err;
//   console.log("连接成功！");

//   const mydb = db.db("test");
// mydb
//   .collection("person")
//   .deleteOne({ age: 20, content: "我是新增加的content字段" });
// });

// 删除多条数据

MongoClient.connect(DB_CONN_STR, function (err, db) {
  if (err) throw err;
  console.log("连接成功！");

  const mydb = db.db("test");
  mydb
    .collection("person")
    .deleteMany({ age: 20, content: "我是新增加的content字段" });
});
