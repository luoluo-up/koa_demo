module.exports = (success, error) => {
  //判断 error 为其设置默认值
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败~~~");
    };
  }
  const mongoose = require("mongoose");
  const { MONGODB_HOST, MONGODB_NAME } = require("../config/config.default");
  //连接数据库
  mongoose.connect(`mongodb://${MONGODB_HOST}/${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //得到数据库连接句柄
  const db = mongoose.connection;
  //通过数据库连接句柄，监听mongoose数据库成功的事件
  db.once("open", () => {
    console.log("数据库连接成功");
    success();
  });
  db.once("error", (err) => {
    error();
    console.log(err);

    //设置连接关闭的回调
    db.on("close", () => {
      console.log("连接关闭");
    });
  });
};
