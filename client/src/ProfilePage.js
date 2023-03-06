import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import "./ProfilePage.css";
import axios from "axios";

function ProfilePage() {
    const [email, setEmail] = useState("");
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/get-all-users");
            console.log(result);
            result.data.forEach(element => {
                if(element.username == currentUsername) {
                    setEmail(element.email);
                    setEvents(element.events);
                }
            });
        }
        fetchData();
    }, [])

    const { currentUsername, setCurrentUsername } = useContext(UserContext);


    var [eventShow, setEventShow] = useState(false);

    function getTotalEmissions(user) {
        var total = 0;
        for(var i = 0; i < user.length; i++) {
            total += user[i].carbonOffset;
        }
        return total;
    }

    function getTotalMiles(user) {
        var total = 0;
        for(var i = 0; i < user.length; i++) {
            total += user[i].distance;
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
                <td>{currentUsername}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Total Carbon Emissions</td>
                <td>{getTotalEmissions(events)}</td>
              </tr>
              <tr>
                <td>Total Miles Traveled</td>
                <td>{getTotalMiles(events)}</td>
              </tr>
              <tr onClick={changeEventShow}>
                <td>Events Attended {!eventShow && <span>{"\u2193"}</span>}{eventShow && <span>{"\u2191"}</span>}</td>
                <td>{events.length}</td>
              </tr>
              {eventShow && events.map((event) => 
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