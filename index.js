const epxress = require('express');
const app = epxress();
const db = require('./db');
const bodyParser = require('body-parser'); // extraxt incomming data from the body
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
require('dotenv').config()


// const passport = require('passport')  // importing passpor t API
const passport = require('./auth') // importing authication file

// Body parsing
app.use(bodyParser.json()) // save in req.body



// middleware functions
const logRequest = (req, res, next) => {
    console.log(`(${new Date().toLocaleString()}) Resquest Made to : ${req.originalUrl}`)
    next() // Move on to next phase
}

app.use(logRequest) // log request  in all get methods

// authentication middleware
const localAuthMiddleware = passport.authenticate('local', {session: false})



// GET METHOD
app.get('/', function (req, res) {
    res.send("Welcome to my hotel")
})


// using personRoutes 
app.use('/person', personRoutes);

// using menuuRoutes
app.use('/menu', localAuthMiddleware ,menuRoutes);




// authentication of routes 
app.use(passport.initialize());


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})

