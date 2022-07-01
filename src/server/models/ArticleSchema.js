const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    groupId: {
        type: String
    },
    title: {
        type: String,
        required: true,
        maxlength: 80
    } ,
    shortDescription: {
        type: String,
        maxlength: 256
    },
    picture: {
        type: String
    }, 
    longDescription: {
        type: String,
        maxlength: 2048
    },
    comments: {
        type: Array
    },
    likes: {
        type: Number
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "published", "rejected"]
    },
    created: {
        type: String
    },
    lastModified: {
        type: String
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;