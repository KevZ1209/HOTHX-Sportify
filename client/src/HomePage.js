import React, { useState, useContext } from "react";
import EventCard from "./EventCard";
import "./HomePage.css"



function HomePage() {
    const [userLocation, setUserLocation] = useState("");
    const [enteredLocation, setEnteredLocation] = useState("");
    const [closestEvents, setClosestEvents] = useState([1,2]);

    const [enteredEventAddress, setEnteredEventAddress] = useState("");
    const [enteredEventName, setEnteredEventName] = useState("");
    const [enteredEvent, setEnteredEvent] = useState();

    const [calculatingDistances, setCalculatingDistances] = useState(false)


    return (
    <div>
        <h1>Home Page!</h1>
        <div className="pageInput">
            <div className="homeBox">
                <p className="homeBoxElement">Please enter your location</p>
                <div className="textAndButton">
                    <input
                        type="text"
                        id="location"
                        name="location"
                        onChange={e => setEnteredLocation(e.target.value)}
                        className="homeBoxElement"
                    />
                    <button
                    onClick={e => {
                        setUserLocation(enteredLocation)
                        setCalculatingDistances(true) 
                    }}
                    disabled={enteredLocation === "" || calculatingDistances}
                    >
                        Enter
                    </button>
                </div>
            </div>
            <div className="homeBox">
                <p className="homeBoxElement">Your event not showing up? Enter its address here</p>
                <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={e => setEnteredEventName(e.target.value)}
                    className="homeBoxElement"
                    placeholder="Event name"
                />
                <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={e => setEnteredEventAddress(e.target.value)}
                    className="homeBoxElement"
                    placeholder="Event address"
                />
                <button
                    onClick={e => setEnteredEvent({name: enteredEventName, address: enteredEventAddress})}
                    disabled={enteredEventName === "" || enteredEventAddress === ""}
                >
                    Add event
                </button>
            </div>
        </div>
        
        {enteredEvent && (<EventCard name={enteredEvent.name} address={enteredEvent.address} going={false}/>)}
        {closestEvents && closestEvents.map(element => {
            return (<EventCard name="Indian Wells" address="1 goat St, Palm Spring" going={false}/>)
        })}
    </div>
    );
}

export default HomePage;