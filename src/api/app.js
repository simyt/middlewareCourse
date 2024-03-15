//main application

const express = require("express");
const user = require("./user")
const account = require("./account")
cors = require("cors") //running frontend and backend on local

const app = express();

app.use(express.json())

app.use("/user", user.router)
app.use("/account", account.router)

app.get('/', function(req, res) {
    res.send("Hello World")
}
) 

app.listen(3000, (errors) => {
    if (errors)
        console.error("not working")
    else
        console.log("listening on Port 3000")
})