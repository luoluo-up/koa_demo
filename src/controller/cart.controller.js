const {
  createOrUpdate,
  getCarts,
  updateCarts,
} = require("../service/cart.service");
const {cartFormatError} =require('../constant/err.type')
class CartController {
  async add(ctx) {
    //将商品添加到购物车
    // 1.解析user_id,goods_id
    const { goods_id } = ctx.request.body;
    const { id: user_id } = ctx.state.user;
    // 2.操作数据库
    const res = await createOrUpdate(user_id, goods_id);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "添加购物车成功",
      result: res,
    };
  }
  async getAll(ctx) {
    //   1.解析请求参数
      const {pageNum = 1,pageSize=10} = ctx.request.query
    // 2.操作数据库
      const res = await getCarts(pageNum,pageSize)
    // 3.返回结果
      ctx.body = {
          code: 0,
          message: "获取购物车列表成功",
          result:res
      }
  }
  async update(ctx) {
    // 1.解析参数
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body;
    console.log(number, selected);
    if (number === undefined && selected === undefined) {
      cartFormatError.message = "number和selected不能同时为空"
        return ctx.app.emit("error", cartFormatError, ctx);
    }
    // 2.操作数据库
    const res = await updateCarts({ id, number, selected });
    // 3.返回数据
    ctx.body = {
      code: 0,
      message: "更新购物车成功",
      result: res,
    }
  }
}
module.exports = new CartController();
