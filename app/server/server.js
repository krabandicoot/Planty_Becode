require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./cors');
const fs = require('fs');

const userRoutes = require('./routes/user');
const playerRoutes = require('./routes/player');
const treeRoutes = require('./routes/tree');
const commentRoutes = require('./routes/comment');


const app = express();
const PORT = process.env.NODE_DOCKER_PORT;
const mongoString = process.env.DB_URL;

// --------- connect to DB 
mongoose.connect(mongoString);
mongoose.set('strictQuery', false);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(`Database couldn't connect properly :\n ${error}`);
});
database.once('connected', () => {
    console.log('Database Connected 📬');
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(morgan('common'));
app.get("/", (req, res) => {
    res.json("Welcome to planty application ☘️");
});

let rawdata = fs.readFileSync('./db/arbustum.json');
let trees = JSON.parse(rawdata);

app.use('/api/user', userRoutes);
app.use('/api/account', playerRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/comment', commentRoutes);


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀`)
});


