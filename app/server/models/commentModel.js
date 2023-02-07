const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        username:{
            required: true,
            type: String
            },
        id:{
            required: true,
            type: String
            }
    },
    tree_id: {
        required: true,
        type: String,
    },
    text: {
        required: true,
        type: String,
        maxLength: 200
    }
}, {timestamps: true});

// const addComment = await Tree.aggregate([
//     {$lookup:
//         {
//             from: "comment",
//             localField: "tree_id",
//             foreignField: "_id",
//             as: "comments"
//     }}
// ]);

module.exports = mongoose.model('Comment',commentSchema);
