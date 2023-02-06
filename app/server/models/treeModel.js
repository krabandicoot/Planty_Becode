const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var randomWords = require('project-name-generator');


const treeSchema = new Schema({
    value:{
        type: String,
        default: 'available'
    },
    price:{
        type: Number, 
    },
    name: {
        type: String,
        default: `${randomWords.spaced()}`,
    },
    owner: {
        type: String,
        default: 'none'
        //get from player's tree 
    },
    species: {
        type: String
        //get from arbustum 
    },
    wikilink: {
        type: String,
        //+(species of the tree str.replace(" " , "_"));)
    },
    diameter:{
        type:Number,
    },
    height:{
        type:Number,
    },
    lon:{
        type:Decimal128,
    },
    lat:{
        type:Decimal128,
    },
});


// -> getTreeprice (calculate )
// -> buyTree (change la valeur de l'arbre et update pour le owner) 
// -> lockTree ()
// -> get