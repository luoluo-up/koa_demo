//导入 mongoose
const mongoose = require("mongoose");
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    description: "用户的姓名",
  },
  password: { type: String, required: true, description: "用户的密码" },
  is_admin: {
    type: Number,
    required: true,
    default: 0,
    description: "0:普通用户 1:管理员",
    },
    create_time: Date
});

//创建模型对象  对文档操作的封装对象
let UserModel = mongoose.model("user", UserSchema);

//暴露模型对象
module.exports = UserModel;
