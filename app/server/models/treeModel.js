const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const treeSchema = new Schema({
    value:{
        type: String,
        default: 'available',
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        default: 'none',
        required: true,
        //get from player's tree 
    },
    species: {
        type: String,
        required: true
        //get from arbustum 
    },
    wikilink: {
        type: String,
        //+(species of the tree str.replace(" " , "_"));)
    },
    diameter:{
        type:Number,
        required: true
    },
    height:{
        type:Number,
        required: true,
    },
    lon:{
        type:Number,
        required: true,
    },
    lat:{
        type:Number,
        required: true
    }
});

// treeSchema.statics.createDB = async function () {
//     let rawdata = fs.readFileSync('../db/arbustum.json');
//     let trees = JSON.parse(rawdata);

//     for(i = 0; i<trees[i].length; i++){
//         const diameter = trees[i].circumference;
//         const createTree = await this.create({price : diameter});
//         return createTree;
//     }
// }

// -> getTreeprice (calculate )
// -> buyTree (change la valeur de l'arbre et update pour le owner) 
// -> lockTree ()
// -> get

module.exports = mongoose.model('Tree',treeSchema);