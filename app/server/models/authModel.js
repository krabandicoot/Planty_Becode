const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{

    }
    email: {
        type: String,
        require: true,
        unique: true, //don't sign up with same email adress
    },
    password:{
        type:String,
        required: true,
    }
    biography:{
        
    }
});

//static signup method on AuthModel
userSchema.statics.signup = async (email, password) => {
    //check if the email exist on the db 
    const exists = await this.findOne({ email }); //(this refers to userSchema) 
    //
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password : hash})
    if(exists){
        throw Error('Email already used, please enter another adress'); 
    }
    
    return user

}
module.exports = mongoose.model('User', userSchema);