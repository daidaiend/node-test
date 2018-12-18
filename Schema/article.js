const { Schema } = require('./config')

const ArticleSchema = new Schema({
    title: String,
    content: String,
    auther: String
})

module.exports = ArticleSchema