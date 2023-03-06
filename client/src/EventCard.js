import React from "react";
import "./EventCard.css"


function EventCard(props) {
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
                <div className="emissionLabel">20 m3</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="transportCircle"></div>
                <div className="transportaionLabel">Public transport</div>
                <div className="emissionLabel">100 m3</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="carpoolCircle"></div>
                <div className="transportaionLabel">Carpool</div>
                <div className="emissionLabel">200 m3</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="carCircle"></div>
                <div className="transportaionLabel">Car</div>
                <div className="emissionLabel">300 m3</div>
                <div className="CO2Label">CO2</div>
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="planeCircle"></div>
                <div className="transportaionLabel">Plane</div>
                <div className="emissionLabel">1000 m3</div>
                <div className="CO2Label">CO2</div>
            </div>
        </div>
    </div>
    );
}

export default EventCard;