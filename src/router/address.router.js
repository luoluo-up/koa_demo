const Router = require("koa-router");
const router = new Router({ prefix: "/address" });
//中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/address.middleware");
// 控制器
const {
  create,
  findAll,
  update,
  remove,
  setDefault,
} = require("../controller/address.controller");
//添加接口:登录，格式
router.post(
  "/",
  auth,
  validator({
    consignee: "string",
    phone: {
      type: "string",
      format: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      address: "string",
    },
  }),
  create
);
//获取地址列表
router.get('/', auth, findAll)
//更新地址
router.put(
  "/:id",
  auth,
  validator({
    consignee: "string",
    phone: {
      type: "string",
      format: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      address: "string",
    },
  }),
  update
);
//删除地址
router.delete('/:id', auth, remove)
//设置默认地址
router.patch('/:id',auth,setDefault)
module.exports = router;
