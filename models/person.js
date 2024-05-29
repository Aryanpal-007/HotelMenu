const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


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
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }


});

// bcrypt
personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new )




    try{
        //hash passowrd generate
        const salt = await bcrypt.genSalt(10)

        // hash password
        const hashedpassword = await bcrypt.hash(person.password,salt)
        person.password = hashedpassword

        next()

    }
    catch(err){
        return next(err)
    }
})

// compare password

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    }
    catch(err){
        throw err;
    }
}




//create person model
const person = mongoose.model('Person', personSchema)

// export the person
module.exports = person