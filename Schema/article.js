const { Schema } = require('./config')

const ArticleSchema = new Schema({
    title: String,
    content: String,
    auther: String,
    tips: String
}, {
    versionKey: false,
    timestamps: {
        creatAt: 'created'
    }
})

module.exports = ArticleSchema