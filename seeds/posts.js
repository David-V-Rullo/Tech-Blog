const { post, Post } = require('../models')

const postData = [
    {
        id: 1,
        title: 'My tech experience',
        body: 'This has been a great experience for me. Please let me know what you think.'
    }
]

const seedPostData = () => Post.bulkCreate(postData)

module.exports = seedPostData