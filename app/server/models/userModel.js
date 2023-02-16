const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Modules
const bcrypt = require('bcrypt');
const validator = require('validator');
const cron = require('node-cron');
//Schema
const Player = require('./playerModel');
const Tree = require('./treeModel');

const userSchema = new Schema({
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
        required: true,
        minLength: 4,
        maxLength: 7,
    }
});

<<<<<<< HEAD
// Functions to regulate the leaf amout
// Add player trees x Leafs every 15 min
const addLeafs = async (username) => {
    const player = await Player.findOne({ username: username });
    const playerTrees = await Tree.find({ owner: username });
    let leafAmount = player.leafs;
    console.log(`the leaf amount is ${leafAmount} after 15 minute`);
    let leafGained = 0;
    for (i = 0; i < playerTrees.length; i++) {
        leafGained += playerTrees[i].price;
    }
    const options = {
        allowDiskUse: false
    };

    // const pipeline = [
    //     {
    //         "$match": {
    //             "owner": username
    //         }
    //     }, 
    //     {
    //         "$count": "treeCount"
    //     }
    // ];

    // const cursor = await Tree.aggregate(pipeline, options).exec();
    // const treeCount = cursor[0].treeCount;
    const newLeafAmount = Math.floor(leafAmount + leafGained);
    // console.log(`the new amount added is ${newLeafAmount}`);
    // console.log(`the new leaf amount is ${newLeafAmount} ❌`);

    // inject new amount in player
    const updateLeafPlayer = await Player.updateOne(
        { _id: player._id },
        {
            $set:
                { leafs: newLeafAmount }
        });

    return updateLeafPlayer;
}
// setTimeout(addLeafs, 900000);

// Take back half of leafs every hour
const takeLeafs = async (username) => {
    const player = await Player.findOne({ username: username });

    const leafAmount = player.leafs;

    const newLeafAmount = Math.floor(leafAmount / 2);
    console.log(`the leaf amount is ${newLeafAmount} after 1 hour`);

    // inject new amount in player
    const updateLeafPlayer = await Player.updateOne(
        { _id: player._id },
        {
            $set:
                { leafs: newLeafAmount }
        });

    // console.log(updateLeafPlayer);
    return updateLeafPlayer;
}

// setTimeout(takeLeafs, 3600000);

=======
>>>>>>> backend
userSchema.statics.signup = async function (username, email, password, color) {

    //Check every fields requirements
    if (!email || !username || !password || !color) {
        throw Error('All fields need to be filled');
    }
    if (!validator.isAlphanumeric(username) && !validator.isAlpha(username)) {
        throw Error('The username must contain only letters and numbers');
    }
    if ((color.charAt(0) != '#') || (!validator.isHexColor(color))) {
        throw Error(`The color entered is not hexadecimal color, be sure you put '#' in front of the combination`);
    }
    if (!validator.isEmail(email)) { //check is the email is a valid structure
        throw Error('The email address entered is not valid');
    }
    if (!validator.isStrongPassword(password)) { //
        throw Error('The password must contain 8 character minimum, with an uppercase, a number and a symbol');
    }

    //check existence in DB
    const emailExist = await this.findOne({ email });
    const usernameExist = await this.findOne({ username });
    if (emailExist) {
        throw Error('Email already used, please enter another adress');
    }
    if (usernameExist) {
        throw Error('Username already used, please enter another name');
    }
    //Protecting and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Create a user in db
    const user = await this.create({ username, email, password: hash, color });
    //Create player in db with sign-up infos
    const player = await Player.create({ username, email, password: hash, color });
    //Attribute three tree as you signed in
    const attributeTree = await Tree.getThree(username);
    //Attribute the player leaf in his wallet as he signed up
    addLeafs(username);
    
    return user, player;
}

userSchema.statics.signin = async function (username, password) {
    if (!username || !password) {
        throw Error('All fields need to be filled');
    }

    const user = await this.findOne({ username });
    console.log(user);
    if (!user) {
        throw Error(`This username doesn't exist`);
    };

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Wrong password');
    };

    return user;
}
module.exports = mongoose.model('User', userSchema);
