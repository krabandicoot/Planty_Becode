const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    username:{
        type: String
    },
    id_tree: {
        type: String,
        default: 'none'
    },
    text: {
        type: String,
        maxLength: 200
    }
}, {timestamps: true});