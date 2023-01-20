const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require ('dotenv').config();

//transter Express content in a variable called app
const app = express();
const PORT = process.env.NODE_DOCKER_PORT;
//storing the URL in a variable MongoString
const mongoString = process.env.DB_URL;

//connection the database to our server with mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

//throw a sucess or error message on the database connection 
database.on('error', (error) => {
    console.log(`Database couldn't connect properly :\n ${error}`)
});
database.once('connected', () => {
    console.log('Database Connected 📬');
});

app.use(express.json());
app.use('/api',routes);
app.get("/", (req, res) => {
    res.json("Welcome to planty application.");
});
//server set on .env
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀`)
});

