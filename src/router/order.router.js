const Router = require("koa-router");
//中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/order.middleware");
//控制器
const { create, findAll, update } = require("../controller/order.controller");
const router = new Router({
  prefix: "/orders",
});
//提交订单
router.post(
  "/",
  auth,
  validator({ address_id: "string", goods_info: "string", total: "string" }),
  create
);
//获取订单列表
router.get('/', auth, findAll)
//更新订单
router.patch("/:id", auth, validator({status:'number'}),update);
module.exports = router;
