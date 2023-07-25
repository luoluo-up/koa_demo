const {invalidGoodsID} = require('../constant/err.type')
const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
             goods_id:'string'
         })
    } catch (error) {
        invalidGoodsID.result = error
        return ctx.app.emit('error',invalidGoodsID,ctx)
    }
    await next()
}
module.exports = {
    validator
}