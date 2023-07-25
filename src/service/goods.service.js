const GoodsModel = require("../model/goods.model");
class GoodsService {
  async createGoods(goods) {
    const res = await GoodsModel.create(goods);
    return res;
  }
  async updateGoods(id, goods) {
    const res = await GoodsModel.updateOne({ id, ...goods });
    return res;
  }
  async realRemoveGoods(id) {
    const res = await GoodsModel.deleteOne({ _id: id });
    return res.deletedCount > 0 ? true : false;
  }
  async removeGoods(id) {
    const res = await GoodsModel.updateOne({ _id: id }, { isDeleted: true });
    console.log(res);
    return res;
  }
  async restoreGoods(id) {
    const res = await GoodsModel.updateOne({ _id: id }, { isDeleted: false });
    console.log(res);
    return res;
  }
  async findGoods(pageNum, pageSize) {
    //1. 获取上架的商品总数
    const count = await GoodsModel.countDocuments({
      isDeleted: false,
    });
    // 2.获取分页的具体数据
    // 计算要跳过的文档数量
    const skipDocs = (pageNum - 1) * pageSize;
    const list = await GoodsModel.find({ isDeleted: false })
      .skip(skipDocs)
      .limit(pageSize);
    return {pageNum,pageSize,count,list};
  }
}
module.exports = new GoodsService();
