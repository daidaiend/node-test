const Router = require('koa-router')

const user = require('../control/user')
const article = require('../control/article')
const router = new Router

//设计路由
router.get('/', user.keepLog, async(ctx) => {
    await ctx.render('index', {
        title: 'daidai',
        session: ctx.session
    })
})
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


module.exports = router