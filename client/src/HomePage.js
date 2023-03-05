import React, { useState, useContext } from "react";
import EventCard from "./EventCard";
import "./HomePage.css"



function HomePage() {
    const [userLocation, setUserLocation] = useState("");
    const [closestEvents, setClosestEvents] = useState([1,2]);

    const [enteredEventAddress, setEnteredEventAddress] = useState("");
    const [enteredEvent, setEnteredEvent] = useState();


    return (
    <div>
        <h1>Home Page!</h1>
        <div>
            <div className="homeBox">
                <p className="homeBoxElement">Please enter your location</p>
                <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={e => setUserLocation(e.target.value)}
                    className="homeBoxElement"
                />
            </div>
            <div className="homeBox">
                <p className="homeBoxElement">Your event not showing up? Enter its address here</p>
                <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={e => setEnteredEventAddress(e.target.value)}
                    className="homeBoxElement"
                />
            </div>
        </div>
        
        {enteredEvent && <div>hello</div>}
        {closestEvents && closestEvents.map(element => {
            return (<EventCard name="Indian Wells" address="1 goat St, Palm Spring" going={false}/>)
        })}
    </div>
    );
}

export default HomePage;