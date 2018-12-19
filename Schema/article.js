const { Schema } = require('./config')
const objectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: objectId,
        ref: 'users'
    },
    tips: String
}, {
    versionKey: false,
    timestamps: {
        creatAt: 'created'
    }
})

module.exports = ArticleSchema