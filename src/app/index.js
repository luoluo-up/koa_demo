const Koa = require('koa');
const path = require('path');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');
const router = require('../router')
const app = new Koa();
const errHandler = require('./errHandler');
const parameter = require('koa-parameter');
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // uploadDir: __dirname + '/../upload',
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
      onFileBegin: (name, file) => {
        // 检查文件类型
        if (!file.mimetype.startsWith("image/")) {
        //   throw new Error("Only image files are allowed");
            throw(400,'不支持的文件类型')
        }
      },
    },
  })
);
app.use(KoaStatic(path.join(__dirname, '../upload')));
app.use(parameter(app));
app.use(router.routes()).use(router.allowedMethods());
//统一错误处理

app.on('error', errHandler)
module.exports = app