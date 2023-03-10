const fs = require('fs');
const mongoose = require('mongoose');
const Tree = require('../models/treeModel');
require('dotenv').config();
const mongoString = process.env.DB_URL;


mongoose.connect(mongoString);

// Delete every datas with a price less than 200 leafs
Tree.deleteMany({price: {$lte: 200 }}).then(function(){
    console.log("Data deleted");
}).catch(function(error){
    console.log(error);
});