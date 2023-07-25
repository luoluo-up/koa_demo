const path = require("path");

const {
  createGoods,
  updateGoods,
  realRemoveGoods,
  removeGoods,
  restoreGoods,
  findGoods,
} = require("../service/goods.service");
const {
  fileUploadError,
  publishGoodsError,
  invalidGoodsID,
} = require("../constant/err.type");
class GoodsController {
  async upload(ctx) {
    const { file } = ctx.request.files;
    // 最好是使用中间件验证文件格式
    const fileTypes = ["image/jpeg", "image/png"];
    if (file) {
      // if(!fileTypes.includes(file.mimetype)){
      //   // return ctx.app.emit('error',unSupportedFileType,ctx)
      //   // 不支持的文件类型，中止上传流程，并返回错误响应
      //   ctx.throw(400, unSupportedFileType.message);
      // }
      ctx.body = {
        code: 0,
        message: "商品图片上传成功",
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }
  async create(ctx) {
    // 直接调用service的createGoods方法
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: "发布商品成功",
        result: res,
      };
    } catch (error) {
      ctx.app.emit("error", publishGoodsError, ctx);
    }
  }
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "修改商品成功",
          result: res,
        };
      } else {
        return ctx.app.emit("error", invalidGoodsID, ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async realRemove(ctx) {
    try {
      const res = await realRemoveGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "删除商品成功",
          result: res,
        };
      } else {
        ctx.app.emit("error", invalidGoodsID, ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async remove(ctx) {
    try {
      const res = await removeGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          // message: "删除商品成功",
          message: "商品下架成功",
          result: res,
        };
      } else {
        ctx.app.emit("error", invalidGoodsID, ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async restore(ctx) {
    try {
      const res = await restoreGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品上架成功",
          result: res,
        };
      } else {
        ctx.app.emit("error", invalidGoodsID, ctx);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async findAll(ctx) {
    // 1.解析pageNum和pageSize
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    // 2.调用数据处理的相关方法
    const res = await findGoods(pageNum, pageSize);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "获取商品列表成功",
      result: res,
    };
  }
}
module.exports = new GoodsController();
