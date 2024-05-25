const express = require('express');
const router = express.Router()


const MenuItem = require('./../models/menuItem')
const bodyParser = require('body-parser'); // extraxt incomming data from the body


// get Menu 
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log("Dish found")
        res.status(200).json(data)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal serer error' })
    }
})


// POST METHOD
// MenuList
router.post('/', async (req, res) => {

    try {
        const data = req.body // req.body contains the data


        // Create a new Menu document 
        const newMenuItem = new MenuItem(data);


        // save the new Menu data
        const response = await newMenuItem.save()
        console.log("Menu is saved")
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }

})

//parameterized API
router.get('/:tasteType', async (req, res) => {

    const tasteType = req.params.tasteType // extraxt the user req data from URL parameter


    try {
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {

            const response = await MenuItem.find({taste: tasteType})
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

        const menuId =  req.params.id; // extraxt the di from the URL
        const updateMenuData = req.body
        
        const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
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

        const menuId =  req.params.id; // extraxt the di from the URL
        
        const response = await MenuItem.findByIdAndDelete(menuId)
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