// for database connection

const mongoose = require('mongoose');
require('dotenv').config()

// defining mogoDB connection url
// const MongoURL = process.env.DB_LOCAL_URL ; // change this to your database url
const MongoURL = process.env.DB_URL // MongoAtlas server


// connecting to database
mongoose.connect(MongoURL)

// Mongoose maintain a defalut connection object
const db = mongoose.connection;


// Mongoose event to check connection
db.on('connected', () => {
    console.log('Connected to database');
})
db.on('error', (err) => {
    console.log('Database connection error: ', err);
})
db.on('disconnected', () => {
    console.log('Disconnected from database');
})



// export db connection
module.exports = db


