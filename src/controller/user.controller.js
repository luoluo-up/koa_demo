const { createUser, getUserInfo } = require("../serveice/user.service");
class UserController {
  async register(ctx, next) {
    // 1.获取数据
    const { user_name, password } = ctx.request.body;
    // 合法性
      if (!user_name || !password) {
          ctx.status = 400
        ctx.body = {
          code: 10001,
          message: "用户名或密码不能为空",
        };
        return;
      }
    //   判断用户名是否重复
      const hasUser = getUserInfo({ user_name });
      if (hasUser) {
        ctx.status = 409
        ctx.body = {
          code: 10002,
          message: "用户名已存在",
        };
        return;
      }
    // 2.操作数据库
    const res = await createUser(user_name, password);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        user_name: res.user_name,
        id: res._id
      },
    };
  }
  async login(ctx, next) {
    ctx.body = "用户登录";
  }
}

module.exports = new UserController();
