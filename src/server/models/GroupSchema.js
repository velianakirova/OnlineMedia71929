const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: String
    },
    lastModified: {
        type: String
    },
    articles: {
        type: Array
    }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;