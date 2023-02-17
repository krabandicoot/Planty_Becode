const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        username: {
            required: true,
            type: String
        },
        id: {
            required: true,
            type: String
        }
    },
    treeInfo: {
        treeName: {
            required: true,
            type: String
        },
        tree_id: {
            required: true,
            type: String
        }
    },
    text: {
        required: true,
        type: String,
        maxLength: 200
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);