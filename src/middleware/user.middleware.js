const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userAlreadyExited,
  userFormateError,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require("../constant/err.type");
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (!user_name || !password) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    // 判断用户名是否重复;
    const hasUser = await getUserInfo({ user_name });
    if (hasUser) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const user = await getUserInfo({ user_name });
    if (!user) {
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
    ctx.user = user;
  } catch (error) {
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }
  await next();
};
module.exports = { userValidator, verifyUser, cryptPassword, verifyLogin };
