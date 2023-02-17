const fs = require('fs');
const mongoose = require('mongoose');
const Tree = require('../models/treeModel');
require('dotenv').config();
const mongoString = "mongodb+srv://root:Stupide@leafappcluster.rjanuu6.mongodb.net/leafapp";


mongoose.connect(mongoString);

// Function call
Tree.deleteMany({price: {$lte: 300 }}).then(function(){
    console.log("Data deleted");
    // Success
}).catch(function(error){
    // Failure
    console.log(error);
});


