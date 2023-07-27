const { addrFormatError } = require("../constant/err.type");
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (error) {
      addrFormatError.result = error;
      return ctx.app.emit("error", addrFormatError, ctx);
    }
    await next();
  };
};
module.exports = {
  validator,
};
