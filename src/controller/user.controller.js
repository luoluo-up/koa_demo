const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const {
  userRegisterError,
  userUpdatepwdError,
} = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");
class UserController {
  async register(ctx, next) {
    // 1.获取数据
    const { user_name, password } = ctx.request.body;
    // 2.操作数据库
    try {
      const res = await createUser(user_name, password);
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          user_name: res.user_name,
          id: res._id,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 获取用户信息(在token的payload中记录id，user_name,is_admin)
    try {
      const res = await getUserInfo({ user_name });
      const user = {};
      Object.assign(user, {
        user_name: res.user_name,
        id: res._id,
        is_admin: res.is_admin,
      });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(user, JWT_SECRET, { expiresIn: "7d" }),
        },
      };
    } catch (error) {}
  }
  async changePassword(ctx, next) {
    // 1.获取数据
    const { password } = ctx.request.body;
    const id = ctx.state.user.id;
    // 2.操作数据库
    const res = await updateById({ id, password });
    if (res.modifiedCount === 0) {
      return ctx.app.emit("error", userUpdatepwdError, ctx);
    } else {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    }
    // 3.返回结果
  }
}

module.exports = new UserController();
