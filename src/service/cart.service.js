const CartModel = require("../model/cart.model");
class CartService {
  async createOrUpdate(user_id, goods_id) {
    try {
      const res = await CartModel.findOneAndUpdate(
        { user_id, goods_id }, // 查询条件
        { $inc: { number: 1 } }, // 使用 $inc 操作符来增加字段的值
        { new: true } // 设置选项 new 为 true，返回更新后的文档
      );
      if (res) {
        return res;
      } else {
        const res = await CartModel.create({ user_id, goods_id });
        return res;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async getCarts(pageNum, pageSize) {
    try {
      //1. 获取上架的商品总数
      const count = await CartModel.countDocuments();
      // 2.获取分页的具体数据
      // 计算要跳过的文档数量
      const skipDocs = (pageNum - 1) * pageSize;
      const list = await CartModel.find()
        .skip(skipDocs)
        .limit(pageSize)
        .populate("goods_info", "_id goods_name goods_img goods_price")
        .lean();
      return { pageNum, pageSize, total: count, list };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateCarts(params) {
    try {
      const { id, number, selected } = params;
      const res = await CartModel.findOneAndUpdate(
        { _id: id },
        { number, selected },
        {
          new: true,
        }
      );
      if (!res) return "";
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async removeCarts(ids) {
    try {
      // const objectIds = ids.map((id) => ObjectId(id));
      return await CartModel.deleteMany({ _id: { $in: ids } });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async selectAllCarts(user_id) {
    try {
      return await CartModel.updateMany({ user_id }, { selected: true });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async unSelectAllCarts(user_id) {
    try {
      return await CartModel.updateMany({ user_id }, { selected: false });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
module.exports = new CartService();
