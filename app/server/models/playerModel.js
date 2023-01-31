const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 30,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        maxLength: 255,
    },
    password:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required: true,
        minLength: 4,
        maxLength: 7,
        unique:true,
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
