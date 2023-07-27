const OrderModel = require("../model/order.model");
class OrderService {
  async createOrder(order) {
    try {
      return await OrderModel.create(order);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async findAllOrder(pageNum, pageSize, status) {
    try {
      //1. 获取订单商品总数
      const count = await OrderModel.countDocuments();
      // 2.获取分页的具体数据
      // 计算要跳过的文档数量
      const skipDocs = (pageNum - 1) * pageSize;
      const list = await OrderModel.find({ status })
        .select("-_id -user_id -address_id")
        .skip(skipDocs)
        .limit(pageSize);
      return { pageNum, pageSize, total: count, list };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateOrder(id, status) {
    try {
      return await OrderModel.updateOne({ _id: id }, { status });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
// mongodb+srv://sehun:<password>@cluster0.84tdl6o.mongodb.net/?retryWrites=true&w=majority
module.exports = new OrderService();

