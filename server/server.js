const express = require("express");
const mongoose = require("mongoose");
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const axios = require('axios')
const API_KEY = require("./API_KEY");

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

/* EVENT SCHEMA AND MODEL */
const eventSchema = new mongoose.Schema({
        name: { type: String, required: true },
        address: { type: String, required: true },
})

const Event = mongoose.model("event", eventSchema);


/* USER SCHEMA AND MODEL */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    events: [{
        name: String,
        address: String,
        transportation: String,
        carbonOffset: Number,
        distance: Number
    }]
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

app.get("/get-user-data/:username", async function(req, res) {
    try {
        const foundUser = await User.findOne({username: req.params.username})
        if (foundUser == null) {
            res.send(false)
        }
        else {
            res.send(foundUser)
        }
    }
    catch (error) {
        res.send(error)
    }
})

app.post("/create-user/:username/:password/:email", async function(req, res) { 
    // returns false if user already exists, true if created successfully
    
    const newUser = new User({
        username: req.params.username,
        password: req.params.password,
        email: req.params.email,
        events: []
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
            res.send(foundUser.password === password)
        }
    }
    catch (error) {
        res.send(error)
    }
    
})

/* EVENT API */
app.get("/get-all-events", async function(req, res) {
    try {
        const events = await Event.find()
        res.send(events);
    } catch (error) {
        res.send(error);
    }
})

app.post("/add-event", function(req, res) {

    const name = req.body.eventName
    const address = req.body.address

    const newEvent = new Event({
        name: name,
        address: address
    })

    try {
        newEvent.save()
        res.send(true)
    }
    catch(error) {
        res.send(error)
    }

})

app.post("/add-event-to-user", async function(req, res) {
    const eventName = req.body.eventName
    const eventAddress = req.body.eventAddress
    const username = req.body.username
    const transportation = req.body.transportation
    const carbonOffset = req.body.carbonOffset
    const distance = req.body.distance

    console.log("HEY");
    try {
        // find the user and insert new event into its array
        try {
          let eventToInsert = {
            name: eventName,
            address: eventAddress,
            transportation: transportation,
            carbonOffset: carbonOffset,
            distance: distance
          }
          let foundUser = await User.findOne({username: username})
          if (foundUser == null) {
            res.send(false)
          } else {
            await foundUser.updateOne(
              {$push: {events: [eventToInsert]}}
            )
            res.send(true)
          }
        } catch (error) {
          res.send(error)
        }
    } catch(error) {
      res.send(error)
    }
  })
  


app.post("/calculate-distance", async function(req, res) {
    try {
        const origin = req.body.origin.replace(/ /g,"+")
        const dest = req.body.dest.replace(/ /g,"+")

        const result = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+dest+"&key="+API_KEY.API_KEY)
        console.log(result.data.rows[0].elements[0]);
        res.send(""+result.data.rows[0].elements[0].distance.value);
    }
    catch(error) {
        res.send("5000000")
    }
})

app.listen(8000, function(req, res) {
    console.log("Listening on port 8000")
})



// 