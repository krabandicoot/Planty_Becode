const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.statics.signup = async function(email, password){

    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already used, please enter another adress');
    }
    const salt = await bcrypt.genSalt(10);//a random string of character that get added to the user password to prevent getting hacked
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash });

    return user;
}
module.exports = mongoose.model('User',userSchema);