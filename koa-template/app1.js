const config = require("./config");
const mongoose = require("mongoose");
const Koa = require("koa");
const app = new Koa();
const uuidv1 = require("uuid/v1");
mongoose.connect(config.db, { useNewUrlParser: true }, (err, db) => {
  console.log(err);
  if (err) return;
  //   const a = db.collection("user").find();
  //   console.log(a, "dddddaaa");
  db.collection("article").insertOne({
    title: "好文章",
    content: "好文章是怎么产生的",
    id: uuidv1(),
    author: "好文章的作者",
  });
  db.collection("article").updateOne(
    { id: 5 },
    { $set: { title: "我是修改的好文章" } }
  );
  db.collection("article").deleteOne({ id: 8 });
});
app.listen(config.port);
