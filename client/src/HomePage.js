import React, { useState, useContext, useEffect } from "react";
import EventCard from "./EventCard";
import axios from "axios";
import "./HomePage.css"



function HomePage() {
    const [userLocation, setUserLocation] = useState("");
    const [enteredLocation, setEnteredLocation] = useState("");
    const [allEvents, setAllEvents] = useState([]);
    const [closestEvents, setClosestEvents] = useState([]);

    const [enteredEventAddress, setEnteredEventAddress] = useState("");
    const [enteredEventName, setEnteredEventName] = useState("");
    const [enteredEvent, setEnteredEvent] = useState();

    const [calculatingDistances, setCalculatingDistances] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/get-all-events");
            console.log(result);
            if(result.data) {
                setAllEvents(result.data);
            }
        }
        fetchData();
    }, [])

    useEffect(()=>{
        async function fetchData() {
            if(userLocation && allEvents){
                console.log("*****");
                const result = await axios.post("http://localhost:8000/calculate-distance", {
                    "origin": userLocation,
                    "dest": allEvents[0].address
                })
                console.log(result);
            }
        }
        fetchData();
    },[allEvents, userLocation])

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
        
        {enteredEvent && (<EventCard name={enteredEvent.name} address={enteredEvent.address} going={false} distance={1000}/>)}
        {allEvents && allEvents.map(element => {
            return (<EventCard name={element.name} address={element.address} going={false} distance={1000}/>)
        })}
    </div>
    );
}

export default HomePage;