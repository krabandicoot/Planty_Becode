require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.NODE_DOCKER_PORT;
const mongoString = process.env.DB_URL;

// --------- connect to DB 
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(`Database couldn't connect properly :\n ${error}`)
});
database.once('connected', () => {
    console.log('Database Connected 📬');
});

app.use(express.json());
app.use('/api/user', userRoutes);
app.get("/", (req, res) => {
    res.json("Welcome to planty application ☘️");
});
//server set on .env
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀`)
});

