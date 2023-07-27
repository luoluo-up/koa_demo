//导入 mongoose
const mongoose = require("mongoose");
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      description: "用户ID",
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      description: "地址ID",
    },
    goods_info: {
      type: String,
      required: true,
      description: "商品信息",
    },
    total: {
      type: Number,
      required: true,
      description: "订单总金额",
    },
    order_number: {
      type: String,
      require: true,
      description: "订单号",
    },
    status: {
      type: Number,
      require: true,
      default: 0,
      description: "订单状态(0:未支付,1:已支付,2:已发货,3:已签收,4:取消)",
    },
  },
  {
    versionKey: false,
  }
);
//创建模型对象  对文档操作的封装对象
let OrderModel = mongoose.model("orders", OrderSchema);

//暴露模型对象
module.exports = OrderModel;
