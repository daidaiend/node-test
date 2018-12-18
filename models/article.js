const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')

const Article = db.model('article', ArticleSchema)
module.exports = Article