const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const router = require('./router/router.js')
const body = require('koa-body')
const logger = require('koa-logger')
const { join } = require('path')

//生成Koa实例
const app = new Koa

//配置日志模块
app.use(logger())
    //配合koa-body 解析post数据
app.use(body())
    //配置静态资源目录
app.use(static(join(__dirname, 'public')))
    //配置视图模板
app.use(views(join(__dirname, 'views'), {
    extension: 'pug'
}))


//注册路由
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('启动成功，3000端口')
})