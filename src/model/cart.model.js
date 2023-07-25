//导入 mongoose
const mongoose = require("mongoose");
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const CartSchema = new mongoose.Schema(
  {
    goods_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      description: "商品的id",
    }, // 使用 goods_id 字段作为新的 _id 字段，并继续生成唯一值,
    user_id: { type: String, required: true, description: "用户的id" },
    number: {
      type: Number,
      required: true,
      default: 1,
      description: "商品的数量",
    },
    selected: {
      type: Boolean,
      required: true,
      default: true,
      description: "是否选中",
    },
  },
  {
    versionKey: false,
  }
);
CartSchema.virtual('goods_info', {
  localField: 'goods_id',
  ref:'goods',
  foreignField: '_id',
  justOne: true
})
CartSchema.set("toJSON", {
  transform: function (doc, ret) {
    // 删除返回的字段
    ret.id = ret._id;
    delete ret.user_id;
    delete ret.goods_id;
    delete ret._id;
  },
});

//创建模型对象  对文档操作的封装对象
let CartModel = mongoose.model("carts", CartSchema);

//暴露模型对象
module.exports = CartModel;
