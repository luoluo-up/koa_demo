//导入 mongoose
const mongoose = require("mongoose");
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
const GoodsSchema = new mongoose.Schema(
  {
    goods_name: {
      type: String,
      required: true,
      description: "商品名称",
    },
    goods_price: { type: Number, required: true, description: "商品价格" },
    goods_num: {
      type: Number,
      required: true,
      description: "商品库存",
    },
    goods_img: {
      type: String,
      required: true,
      description: "商品图片的url",
    },
    isDeleted: {
      type: Boolean,
      default: false, // 默认值为 false 表示商品未删除（上架状态）
    },
  },
  {
    versionKey: false,
  }
);
//创建模型对象  对文档操作的封装对象
let GoodsModel = mongoose.model("goods", GoodsSchema);

//暴露模型对象
module.exports = GoodsModel;
