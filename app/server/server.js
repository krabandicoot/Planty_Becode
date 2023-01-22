require ('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// --------- import routes
const authRoutes = require('./routes/authRoute');

//transter Express content in a variable called app
const app = express();
const PORT = process.env.NODE_DOCKER_PORT;
//storing the URL in a variable MongoString
const mongoString = process.env.DB_URL;

// --------- connect to DB 
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
// --------- middleware
app.use(express.json());
// --------- Routes
app.use('/api/user', authRoutes);

app.get("/", (req, res) => {
    res.json("Welcome to planty application ☘️");
});
//server set on .env
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} 🚀`)
});

