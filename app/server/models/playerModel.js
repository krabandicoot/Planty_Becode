const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    bio:{
        type:String, 
        maxLength: 500,
    },
    leafs:{
        type: Number
    },
    // trees:Trees (link to the schema, need to import the model
}, {timestamps: true});

// playerSchema.aggregate.lookup({ from: 'users', localField: 'username_id', foreignField: '_id', as: 'username_id' });


module.exports = mongoose.model('Player',playerSchema);
