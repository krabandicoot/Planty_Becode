const fs = require('fs');
const mongoose = require('mongoose');
const Tree = require('../models/treeModel');
require('dotenv').config();
const randomWords = require('project-name-generator');
const mongoString = process.env.DB_URL;

function replaceAll(string, search, replace) {
    return string?.split(search).join(replace);
}

let rawdata = fs.readFileSync('./arbustum.json');
let trees = JSON.parse(rawdata);

const treeEntry = [];

for(let i = -1; i < trees.length; i++){
    let circumference = Math.round(trees[i]?.circumference / 3.14);
    let height = Math.round(trees[i]?.height);
    
    treeEntry.push(
        new Tree({
        price: Math.round(circumference * height),
        species: trees[i]?.tree_species,
        name: `${randomWords().spaced}`,
        wikilink: `https://en.wikipedia.org/wiki/${replaceAll(trees[i]?.tree_species," ","_")}`,
        diameter: circumference,
        height: height,
        lon:  trees[i]?.geo_point_2d.lon,
        lat: trees[i]?.geo_point_2d.lat,
    })
    )
}

mongoose
.connect((mongoString), { useNewUrlParser: true })
.catch(err => {
    console.log(err.stack);
    process.exit(1);
})
.then(() => {
    console.log("connected to db in development environment");
});
treeEntry.map(async (t, index) => {
    await t.save((err, result) => {
    console.log(index);
    if (index === treeEntry.length - 1) {
        console.log("DONE!");
        mongoose.disconnect();
    }
    });
});
