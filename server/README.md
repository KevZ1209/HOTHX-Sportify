
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
            carbonOffset: 200.0
        },
        {
            name: "Billy Joel Concert",
            address: "330 De Neve Dr, Los Angeles, CA, 90024",
            transportation: "carpool",
            carbonOffset: 200.0
        }
    ]
   },
   {
    username: "kevin",
    email: "kevin@gmail.com",
    password: "123456",
    events: [
        {
            eventId: "Indian Wells",
            distance: "Indian Wells, CA",
            transportation: "carpool",
            carbonOffset: 200.0
        }
    ]
   },
   {
    username: "charles",
    email: "charles@gmail.com",
    password: "123456",
    events: [
    ]
   }
]);

db.events.insertMany([
    {
        name: "Indian Wells",
        address: "Indian Wells, CA",
    }
])
```