//handle requests for user information

const express = require("express")
const database = require("../../database/mock_data")

const router = express.Router()

router.get("/get-all", (req,res) => {
    const users = database.get_all_users()

    res.send(users)
})

//create a module within the application to allow the main module to access this function 
module.exports = { router }