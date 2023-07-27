//导入 mongoose
const mongoose = require("mongoose");
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const AddressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      description: "用户ID",
    },
    consignee: { type: String, required: true, description: "收货人姓名" },
    phone: {
      type: Number,
      required: true,
      description: "收货人的手机号",
    },
    address: {
      type: String,
      required: true,
      description: "收货人的地址",
    },
    is_default: {
      type: Boolean,
      require: true,
      default: false, // 默认值为 false 表示不是默认地址
      description: "是否为默认地址,false:不是(默认值) true:是",
    },
  },
  {
    versionKey: false,
  }
);
//创建模型对象  对文档操作的封装对象
let AddressModel = mongoose.model("address", AddressSchema);

//暴露模型对象
module.exports = AddressModel;
