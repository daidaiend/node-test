const Article = require('../models/article')
const { db } = require('../Schema/config')


exports.addPage = async(ctx) => {
    await ctx.render('add-article', {
        title: 'addArticle',
        session: ctx.session
    })
}
exports.add = async(ctx) => {
    if (ctx.session.isNew) {
        return ctx.body = {
            msg: '未登录',
            status: 0
        }
    }
    const data = ctx.request.body

    data.auther = ctx.session.username

    await new Promise((resolve, reject) => {
        new Article(data).save((err, data) => {
            if (err) return reject(err)
            resolve()
        })
    }).then(data => {
        ctx.body = {
            msg: '发表成功',
            status: 1
        }
    }).catch(err => {
        ctx.body = {
            msg: '发表失败',
            status: 0
        }
    })
}