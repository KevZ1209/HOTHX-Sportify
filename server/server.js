const express = require("express");
const mongoose = require("mongoose");
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')

dotenv.config()

// enable access to all origins
app.use(cors())

// allows for req.body to get Axios POST data
app.use(express.json())

main().catch(err => console.log(err));

// connect to mongoDB database
async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/sports_db");
}


/* ***************** SCHEMAS AND MODELS ***************** */

/* USER SCHEMA AND MODEL */
const userSchema = new mongoose.Schema({
    // Username and password
    username: String,
    password: String,
    email: String
});

const User = mongoose.model("user", userSchema);

/* ***************** API ENDPOINTS ***************** */

/* USER API */

app.get("/get-all-users", async function(req, res) {
    try {
        const users = await User.find()
        res.send(users);
    } catch (error) {
        res.send(error);
    }
});

app.post("/create-user/:username/:password/:email", async function(req, res) { 
    // returns false if user already exists, true if created successfully
    
    const newUser = new User({
        username: req.params.username,
        password: req.params.password,
        email: req.params.email
    })
    
    try {
        let foundUser = await User.findOne({username: req.params.username})
        if (foundUser == null) {
            try {
                await newUser.save()
                res.send(true)
            } catch (error) {
                res.send(error)
            }
        }
        else {
            res.send(false)
        }
        
    }
    catch (error) {
        res.send(error)
    }

})

app.post("/check-password/:username/:password", async function(req, res) { 
    // sends true if password matches for the user, false if user doesn't exist or password doesn't match

    const searchUsername = req.params.username
    const password = req.params.password

    try {
        let foundUser = await User.findOne({username: searchUsername})
        if (foundUser == null) {
            // if user doesn't exist, return false
            res.send(false)
        }
        else {
            // return true if passwords match, false otherwise
            res.send(foundUser.password == password)
        }
    }
    catch (error) {
        res.send(error)
    }
    
})


app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})
