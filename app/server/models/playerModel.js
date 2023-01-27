const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username:{
        type: String,
        minLength: 4,
        maxLength: 255,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        maxLength: 255,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    color:{
        type:String, 
        minLength: 4,
        maxLength: 7,
        required: true,
    },
    bio:{
        type:String, 
        maxLength: 500,
    },
    leafs:{
        type: Number
    },
    // trees:Trees (link to the schema, need to import the model
}, {timestamps: true});




module.exports = mongoose.model('Player',playerSchema);
