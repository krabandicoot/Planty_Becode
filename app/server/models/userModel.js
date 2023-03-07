const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const Player = require("./playerModel");
const Tree = require("./treeModel");
const { addLeafs } = require("../middlewares/leafTimeout");

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
  },
});
// --------- Sign up
userSchema.statics.signup = async function (username, email, password, color) {
  // Check every fields requirements
  if (!email || !username || !password || !color) {
    throw Error("All fields need to be filled");
  }
  if (!validator.isAlphanumeric(username) && !validator.isAlpha(username)) {
    throw Error("The username must contain only letters and numbers");
  }
  if (color.charAt(0) != "#" || !validator.isHexColor(color)) {
    throw Error(
      `The color entered is not hexadecimal color, be sure you put '#' in front of the combination`
    );
  }
  if (!validator.isEmail(email)) {
    throw Error("The email address entered is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "The password must contain 8 character minimum, with an uppercase, a number and a symbol"
    );
  }

  // Check existence in DB
  const emailExist = await this.findOne({ email });
  const usernameExist = await this.findOne({ username });
  if (emailExist) {
    throw Error("Email already used, please enter another adress");
  }
  if (usernameExist) {
    throw Error("Username already used, please enter another name");
  }
  // Protecting and hashing the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // Create the user in DB as you sign up
  const user = await this.create({ username, email, password: hash, color });
  // Create the playerin DB as you sign up
  const player = await Player.create({
    username,
    email,
    password: hash,
    color,
  });
  // Attribute three tree as you signed in
  const attributeTree = await Tree.getThree(username);
  // Attribute the player leaf in his wallet as he signed up
  addLeafs(username);

  return user, player;
};

// --------- Sign in

userSchema.statics.signin = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields need to be filled");
  }

  const user = await this.findOne({ username });
  console.log(user);
  if (!user) {
    throw Error(`This username doesn't exist`);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Wrong password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
