const fs = require('fs');
const mongoose = require('mongoose');
const Tree = require('../models/treeModel');
require('dotenv').config();
const mongoString = process.env.DB_URL;


mongoose.connect(mongoString);

// Function call
Tree.deleteMany({ price: { $eq: 0 } }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
mongoose.disconnect();