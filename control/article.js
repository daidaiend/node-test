const Article = require('../models/article')
const { db } = require('../Schema/config')


const User = require('../models/user')


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

    data.author = ctx.session.uid

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


exports.getList = async(ctx) => {

    let page = ctx.params.id
    page--
    const maxNum = await Article
        .estimatedDocumentCount((err, num) => {
            err ? console.log(err) : num
        })

    const articleList = await Article
        .find()
        .sort('-created')
        .skip(5 * page)
        .limit(5)
        .populate({
            path: 'author',
            select: 'username _id avatar'
        })
        .then(data => data)
        .catch(err => {
            console.log(err)
        })

    await ctx.render('index', {
        title: 'index',
        session: ctx.session,
        artList: articleList,
        maxNum
    })
}