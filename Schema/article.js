const { Schema } = require('./config')

const ArticleSchema = new Schema({
    title: String,
    content: String,
    auther: String
}, { versionkey: false })

module.exports = ArticleSchema