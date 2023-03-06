
# Route Details
backend runs on `localhost:8000`

## GET
`/get-all-users` returns all user objects in the database


## POST 
`/create-user/:username/:password/:email` creates a new user with specified username, password and email\
**example:** \
POSTING to `localhost:8000/create-user/kev/password/kev@gmail.com` \
creates a new user `kev` with password `password` and email `kev@gmail.com`

`/check-password/:username/:password` checks password and username combo. Returns true if correct, false otherwise
**example:** \
POSTING to `/check-password/kev/password` returns `true` since it's a correct combo


Start Local DB query:
```
db.users.deleteMany({});

db.events.deleteMany({});

db.events.insertMany([
    {
        name: "Indian Wells",
        address: "Indian Wells, CA",
    },
    {
        name: "Billy Joel Concert",
        address: "Sofi Stadium, Los Angeles",
    },
    {
        name: "US Open",
        address: "Flushing Meadows, NY",
    },
    {
        name: "Roland Garros",
        address: "Paris, France",
    },
    {
        name: "Wimbledon",
        address: "Wimbledon, UK",
    },
    {
        name: "San Diego Open",
        address: "San Diego, CA",
    }
]);

db.users.insertMany([
   {
    username: "marcus",
    email: "marcus@gmail.com",
    password: "123456",
    events: [
        {
            name: "Indian Wells",
            address: "Indian Wells, CA",
            transportation: "carpool",
            carbonOffset: 200.0,
            distance: 93
        },
        {
            name: "Billy Joel Concert",
            address: "Sofi Stadium, Los Angeles",
            transportation: "plane",
            carbonOffset: 1000.0,
            distance: 10
        }
    ]
   },
   {
    username: "kevin",
    email: "kevin@gmail.com",
    password: "123456",
    events: [
        {
            name: "Indian Wells",
            address: "Indian Wells, CA",
            transportation: "carpool",
            carbonOffset: 200.0,
            distance: 93
        },
        {
            name: "US Open",
            address: "Flushing Meadows, NY",
            transportation: "walk",
            carbonOffset: 10.0,
            distance: 1000
        }
    ]
   },
   {
    username: "charles",
    email: "charles@gmail.com",
    password: "123456",
    events: [
        {
            name: "Wimbledon",
            address: "Wimbledon, UK",
            transportation: "plane",
            carbonOffset: 10000.0,
            distance: 6000
        },
        {
            name: "San Diego Open",
            address: "San Diego, CA",
            transportation: "public",
            carbonOffset: 10.0,
            distance: 200
        }
    ]
   }
]);
```