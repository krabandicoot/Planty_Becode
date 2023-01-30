require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/user');


const app = express();
const PORT = process.env.NODE_DOCKER_PORT;
const mongoString = process.env.DB_URL;

// --------- connect to DB 
mongoose.connect(mongoString);
mongoose.set('strictQuery', true);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(`Database couldn't connect properly :\n ${error}`)
});
database.once('connected', () => {
    console.log('Database Connected 📬');
});

app.use(express.json());
app.use(cors({
    origin:['http://localhost:8080','http://locahost:5173'],
    credentials:true
}));

app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', ['http://localhost:8080', 'http://locahost:5173']);
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(morgan('common'));
app.get("/", (req, res) => {
    res.json("Welcome to planty application ☘️");
});
app.use('/api/user', userRoutes);

//server set on .env
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀`)
});

