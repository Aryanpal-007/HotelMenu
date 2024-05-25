const express = require('express');
const router = express.Router()

const person = require('./../models/person') // import person from
const bodyParser = require('body-parser'); // extraxt incomming data from the body
const { error } = require('console');


// POST METHOD
router.post('/', async (req, res) => {

    try {
        const data = req.body // req.body contains the data


        // Create a new Person document 
        const newPerson = new person(data);


        // save the new person data
        const response = await newPerson.save()
        console.log("Person's data saved")
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }

})


// GET PERSON
router.get('/', async (req, res) => {
    try {
        const data = await person.find()
        console.log("Data found")
        res.status(200).json(data)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal serer error' })
    }
})



//parameterized API
router.get('/:workType', async (req, res) => {

    const workType = req.params.workType // extraxt the user req data from URL parameter


    try {
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response = await person.find({work: workType})
            console.log("Response fetched")
            res.status(200).json(response)
        }
        else{

            res.status(500).json({ error: 'Invalid work-type' })
        
        }
    }
    catch (err) { 
        console.log(err)
        res.status(500).json({ error: 'Internal serer error'})
    }

})


// search and update
router.put('/:id',  async (req, res) => {
    try{

        const personId =  req.params.id; // extraxt the di from the URL
        const updatePersonData = req.body
        
        const response = await person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // Return the updateed document
            runValidators: true,  // Run Mongoose validation rules
        })

        if(!response){
            return res.status(404).json({ error: 'Person not found'})
        }

        console.log("Updated")
        res.status(200).json(response)

    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal serer error'})
    }
})



// search and DELETE
router.delete('/:id',  async (req, res) => {
    try{

        const personId =  req.params.id; // extraxt the di from the URL
        
        const response = await person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({ error: 'Person not found'})
        }

        console.log("Data Delete")
        res.status(200).json({message: 'Person deleted succesfully'})

    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal serer error'})
    }
})



module.exports = router