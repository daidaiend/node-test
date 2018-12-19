const Router = require('koa-router')

const user = require('../control/user')
const article = require('../control/article')
const router = new Router

//设计路由
router.get('/', user.keepLog, article.getList)

router.get(/^\/user\/(?=reg|login)/, async(ctx) => {
    const show = /reg$/.test(ctx.path)
    await ctx.render('register', {
        show
    })
})
router.post('/user/reg', user.reg)
router.post('/user/login', user.login)

router.get('/user/logout', user.logout)


router.get('/article', user.keepLog, article.addPage)

router.post('/article', user.keepLog, article.add)

router.get('/page/:id', article.getList)


module.exports = router