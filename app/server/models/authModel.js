const require mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true, //don't sign up with same email adress
    },
    password:{
        type:String,
        required: true
    }, 

})

module.exports = mongoose.model('Auth', authSchema);