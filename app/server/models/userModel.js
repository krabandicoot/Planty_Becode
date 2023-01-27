const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Player = require('./playerModel')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    }
});

Player.aggregate([{
    $lookup:{
        from: "users",
        localField: "username_id",
        foreignField: "_id",
        as: "username_id"
    }},
    {
        $match: {
            joined: []
        }
}]);

userSchema.statics.signup = async function(email, password){

    //validation 
    if(!email || !password){
        throw Error('All fields need to be filled');
    }
    if(!validator.isEmail(email)){ //check is the email is a valid structure
        throw Error('The email address entered is not valid');
    }
    if(!validator.isStrongPassword(password)){ //
        throw Error('The password must be 8 character minimum, with an uppercase, a number and a symbol');
    }
    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already used, please enter another adress');
    }
    const salt = await bcrypt.genSalt(10);//a random string of character that get added to the user password to prevent getting hacked
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash });

    return user;
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields need to be filled');
    }

    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User',userSchema);