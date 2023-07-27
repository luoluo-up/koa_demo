const Router = require("koa-router");
//中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");
//控制器
const {
  add,
  getAll,
  update,
  remove,
  selectAll,
  unselectAll,
} = require("../controller/cart.controller");
const router = new Router({ prefix: "/carts" });
// 添加到购物车
router.post("/", auth, validator({goods_id:'string'}), add);
//获取购物车列表
router.get("/", auth, getAll);
// 更新购物车
router.patch('/:id', auth, validator({ number: { type: 'number', required: false }, selected: { type: 'bool', required: false } }), update)
//删除购物车
router.delete("/", auth, validator({ ids: "array" }), remove)
//全选与全不选接口
router.post('/selectAll',auth,selectAll)
router.post('/unselectAll',auth,unselectAll)
module.exports = router;
