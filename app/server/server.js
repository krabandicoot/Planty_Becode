// -------- Modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');
const axios = require('axios');

// -------- Routes paths
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

// app.use(cors(corsOptions));
app.use(cors({ origin: "https://planty.onrender.com", credentials: true }));
app.use(express.json());

// -------- Show the log done with the time 
app.use(morgan('common'));

// -------- First try to resolve the GET refresh error
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

// -------- Routes
app.get("/", (req, res) => {
    res.json("Welcome to planty application ☘️");
});
app.use('/api/user', userRoutes);
app.use('/api/account', playerRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/comment', commentRoutes);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀`)
});

// -------- Timer for the users wallet
const { leafWallet } = require('./middlewares/leafTimeout');

leafWallet();

setInterval(() => {
    axios.get('https://planty-api.onrender.com').then((res) => {
        console.log("OK");
    })
},600000);