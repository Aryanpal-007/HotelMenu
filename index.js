const epxress = require('express');
const app = epxress();
const db = require('./db');
const bodyParser = require('body-parser'); // extraxt incomming data from the body
const personRoutes =  require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
require('dotenv').config()

// Body parsing
app.use(bodyParser.json()) // save in req.body


// GET METHOD
app.get('/', function (req, res) {
    res.send("Welcome to my hotel")
})


// using personRoutes 
app.use('/person', personRoutes);

// using menuuRoutes
app.use('/menu', menuRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})

