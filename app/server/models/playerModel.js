const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255,
    },
    password: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        minLength: 4,
        maxLength: 7,
        unique: true,
    },
    bio: {
        type: String,
        default: 'Leaf is a small, green leaf that lives in the forest. He has many friends, but he doesnt have any friends at school. One day Leaf goes to school and meets a new friend named Petal. They become best friends and Leaf learns so much from her.',
        maxLength: 500,
    },
    leafs: {
        type: Number,
        default: 90,
    },
    trees: {
        type: Map,
    }
    //Trees (link to the schema, need to import the model
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
