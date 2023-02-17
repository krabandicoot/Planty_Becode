const fs = require('fs');
const mongoose = require('mongoose');
const Tree = require('../models/treeModel');
require('dotenv').config();
const mongoString = process.env.DB_URL;;

mongoose.connect(mongoString);

Tree.deleteMany({price: {$lte: 300 }}).then(function(){
    console.log("Data deleted");
}).catch(function(error){
    console.log(error);
});


