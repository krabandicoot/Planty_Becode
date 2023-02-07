const fs = require('fs');
const mongoose = require('mongoose')
const Tree = require('../models/treeModel');
require('dotenv').config()
const mongoString = process.env.DB_URL;

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

// mongoose.connect(process.env.DB_URL)
// .then(() => {
//     console.log('seeding ok')
// })
// .catch((err) => {
//     console.log(err)
// })
let rawdata = fs.readFileSync('./arbustum.json');
let trees = JSON.parse(rawdata);

let i = 0

const treeEntry = [
  new Tree({
    price: (trees[i].circumference * trees[i].height),
    species: trees[i].tree_species,
    wikilink: `https://en.wikipedia.org/wiki/${replaceAll(trees[i].tree_species," ","_")}`,
    diameter: trees[i].circumference,
    height: trees[i].height,
    lon:  trees[i].geo_point_2d.lon,
    lat: trees[i].geo_point_2d.lat,
  }),
]

  mongoose
  .connect(("mongodb+srv://root:Stupide@leafappcluster.rjanuu6.mongodb.net/leafapp"), { useNewUrlParser: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("connected to db in development environment");
  });
  
  treeEntry.map(async (p, index) => {
    await p.save((err, result) => {
      if (index === treeEntry.length - 1) {
        console.log("DONE!");
        mongoose.disconnect();
      }
    });
});



// for(i = 0; i<trees[i].length; i++){
//   trees[i].circumference = diameter;
//   trees[i].height = height;
//   }

// const seedDB = async () => {
//   await Tree.deleteMany({})
//   await Tree.insertMany(trees)
// }

// seedDB().then(() => {
//   mongoose.connection.close()
// })
