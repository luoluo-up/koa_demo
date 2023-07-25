const Router = require("koa-router");
const { auth, hadAdminPermission } = require("../middleware/auth.middleware");
const {validator} = require("../middleware/goods.middleware")
const {
  upload,
  create,
  update,
  remove,
  restore,
  realRemove,
  findAll,
} = require("../controller/goods.controller");
const router = new Router({ prefix: "/goods" });
// 商品图片上传
router.post("/upload", auth, hadAdminPermission, upload);
// 商品信息上传
router.post("/", auth, hadAdminPermission, validator, create);
// 商品修改
router.put("/:id", auth, hadAdminPermission, validator, update);
// 商品删除
router.delete("/:id", auth, hadAdminPermission, realRemove);
// 商品下架
router.post("/:id/off", auth, hadAdminPermission, remove);
//商品下架
router.post("/:id/on", auth, hadAdminPermission, restore);
// 获取商品列表
router.get("/", auth, hadAdminPermission, findAll);
module.exports = router;
