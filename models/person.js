const mongoose = require('mongoose')


// define the person schema 
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true // mandatory
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter', 'manager'],
        required: true 
    }, 
    mobile:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
        type: Number,
        required: true  
    }

});


//create person model
const person = mongoose.model('Person', personSchema)

// export the person
module.exports = person