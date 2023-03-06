import React from "react";
import "./EventCard.css"


function EventCard(props) {

    const walkCarbon = Math.round(props.distance * 0.058 / 2 * 100) / 100;
    const transportCarbon = Math.round(props.distance * 0.09133 * 100) / 100;
    const carpoolCarbon = Math.round(props.distance * 0.348 / 3 * 100) / 100;
    const carCarbon = Math.round(props.distance * 0.371 * 100) / 100;
    const planeCarbon = Math.round(props.distance * 24.0404 * 100) / 100;


    return (
    <div className="eventCardContainer"> 
        <div className="eventAttributesContainer">
            <div className="attributeLabel">{props.name}</div>
            <div className="attributeLabel">{props.address}</div>
            <div className="attributeLabel">{props.distance} miles away</div>
            <button onClick={e => console.log("Pressed going button!")} className="loginElement">{props.going ? "Not going" : "I'm going!"}</button>
        </div>
        <div className="emissionsContainer">
            <div className="transportationContainer">
                <div className="colorCircle" id="walkCircle"></div>
                <div className="transportaionLabel">Walk</div>
                <div className="emissionLabel">{walkCarbon} kg</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="transportCircle"></div>
                <div className="transportaionLabel">Public transport</div>
                <div className="emissionLabel">{transportCarbon} kg</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="carpoolCircle"></div>
                <div className="transportaionLabel">Carpool</div>
                <div className="emissionLabel">{carpoolCarbon} kg</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="carCircle"></div>
                <div className="transportaionLabel">Car</div>
                <div className="emissionLabel">{carCarbon} kg</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="planeCircle"></div>
                <div className="transportaionLabel">Plane</div>
                <div className="emissionLabel">{planeCarbon} kg</div>
                <div className="CO2Label">CO2</div>
            </div>
        </div>
    </div>
    );
}

export default EventCard;