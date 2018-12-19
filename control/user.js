const encrypt = require('../util/encrypt')
const User = require('../models/user')

exports.reg = async ctx => {
    const user = ctx.request.body
    const username = user.username
    const password = user.password

    await new Promise((resolve, reject) => {
        User.find({ username }, (err, data) => {
            if (err) return reject(err)
            if (data.length !== 0) {
                return resolve('')
            }
            const _user = new User({
                username,
                password: encrypt(password)
            })
            _user.save((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    }).then(async data => {
        if (data) {
            await ctx.render('isOk', {
                status: '注册成功'
            })
        } else {
            await ctx.render('isOk', {
                status: '用户名已经存在'
            })
        }

    }).catch(async err => {
        await ctx.render('isOk', {
            status: '注册失败，请重试'
        })
    })
}


// 用户登录
exports.login = async ctx => {
    // 拿到 post 数据
    const user = ctx.request.body
    const username = user.username
    const password = user.password

    await new Promise((resolve, reject) => {
        User.find({ username }, (err, data) => {
            if (err) return reject(err)
            if (data.length === 0) return reject("用户名不存在")


            if (data[0].password === encrypt(password)) {
                return resolve(data)
                    // console.log(data[0].password)
            }
            resolve("")
        })
    }).then(async data => {
        if (!data) {
            await ctx.render('isOk', {
                status: "密码不正确，登录失败"
            })
        } else {
            ctx.cookies.set('username', username, {
                domain: 'localhost',
                path: '/',
                maxAge: 36e5,
                httpOnly: true,
                overwrite: false
            })
            ctx.cookies.set('uid', data[0]._id, {
                domain: 'localhost',
                path: '/',
                maxAge: 36e5,
                httpOnly: true,
                overwrite: false
            })
            ctx.session = {
                username,
                uid: data[0]._id,
                avatar: data[0].avatar
            }
            await ctx.render('isOk', {
                status: '登陆成功'
            })
        }
    }).catch(async err => {
        await ctx.render('isOk', {
            status: err
        })
    })
}


exports.keepLog = async(ctx, next) => {
    if (ctx.session.isNew) {
        if (ctx.cookies.get('username')) {
            ctx.session = {
                username: ctx.cookies.get('username'),
                uid: ctx.cookies.get('uid')
            }
        }
    }
    await next()
}

exports.logout = async(ctx) => {
    ctx.session = null
    ctx.cookies.set('username', null, {
        maxAge: 0
    })
    ctx.cookies.set('uid', null, {
        maxAge: 0
    })
    await ctx.redirect('/')
}