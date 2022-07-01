const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        maxlength: 15
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    role: {
        type: String,
        required: true,
        enum: ["reader", "admin", "journalist", "editor"]
    },
    picture: {
        type: String
    },
    created: {
        type: String
    },
    lastModified: {
        type: String
    },
    writtenArticles: {
        type: Array
    },
    savedArticles: {
        type: Array
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;