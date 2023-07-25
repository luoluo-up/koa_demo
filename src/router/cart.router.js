const Router = require("koa-router");
//中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");
//控制器
const { add, getAll } = require("../controller/cart.controller");
const router = new Router({ prefix: "/carts" });
// 添加到购物车
router.post("/", auth, validator, add);
//获取购物车列表
router.get("/", auth, getAll);
module.exports = router;