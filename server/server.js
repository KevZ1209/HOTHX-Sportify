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

app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})
