//main application

const express = require("express");
const user = require("./user")
const account = require("./account")
cors = require("cors")


const app = express()

app.use(express.json())
app.use(cors()); 

app.use("/user", user.router)
app.use("/account", account.router)

app.get('/', function(req, res) {
    res.send("Hello World")
})

app.post('/submit', (req, res) => {
    let first_name = req.body.first_name
    let email = req.body.email
    // send information to database
    res.send("Particulars submitted successfully")
})


app.listen(3000, (errors) => {
    if (errors)
        console.error("not working")
    else
        console.log("Listening on Port 3000")
})