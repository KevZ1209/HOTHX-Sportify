import React, { useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {
    const user = {
        username: "marcuscheng123",
        email: "marcusdcheng@gmail.com",
        events: [
            {
                name: "LATC",
                address: "330 De Neve Dr.",
                transportation: "Car",
                distance: 20,
                carbonOffset: 2933,
            },
            {
                name: "Pauley",
                address: "330 De Neve Dr.",
                transportation: "Car",
                distance: 30,
                carbonOffset: 2133,
            },
        ]
    };
    var [eventShow, setEventShow] = useState(false);

    function getTotalEmissions(user) {
        var total = 0;
        for(var i = 0; i < user.events.length; i++) {
            total += user.events[i].carbonOffset;
        }
        return total;
    }

    function getTotalMiles(user) {
        var total = 0;
        for(var i = 0; i < user.events.length; i++) {
            total += user.events[i].distance;
        }
        return total;
    }

    function changeEventShow() {
        setEventShow(!eventShow);
    }

    return (
    <div id="profile">
        <h1>Profile</h1>
        <div>
        <table id="profile-table">
            <tbody>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Total Carbon Emissions</td>
                <td>{getTotalEmissions(user)}</td>
              </tr>
              <tr>
                <td>Total Miles Traveled</td>
                <td>{getTotalMiles(user)}</td>
              </tr>
              <tr onClick={changeEventShow}>
                <td>Events Attended {!eventShow && <span>{"\u2193"}</span>}{eventShow && <span>{"\u2191"}</span>}</td>
                <td>{user.events.length}</td>
              </tr>
              {eventShow && user.events.map((event) => 
                  <table id="events-table">
                  <tr>
                    <td>Name</td>
                    <td>{event.name}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{event.address}</td>
                  </tr>
                  <tr>
                    <td>Method of Transportation</td>
                    <td>{event.transportation}</td>
                  </tr>
                  <tr>
                    <td>Carbon Emissions</td>
                    <td>{event.carbonOffset}</td>
                  </tr>
                  <tr>
                    <td>Distance</td>
                    <td>{event.distance}</td>
                  </tr>
                </table>
                )}
            </tbody>
          </table>
        </div>
    </div>
    );
}

export default ProfilePage;