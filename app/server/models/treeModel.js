const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

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

treeSchema.statics.getThree = async function(username){
    try{
        const treeCount = await this.count();
        for(i = 0; i < 3; i++){
            this.findOne({owner: 'none'}).skip(Math.floor(Math.random() * treeCount)).exec(
                function (err, result){
                    result.owner = `${username}`;
                    result.value = 'unavailable';
                    result.save();
                    console.log(result);
                    return result;
                });
        }
    }catch(err){
        console.log(err)
    }
};

module.exports = mongoose.model('Tree',treeSchema);