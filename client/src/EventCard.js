import React, { useState,  useContext} from "react";
import "./EventCard.css"
import axios from "axios";
import UserContext from "./UserContext";


function EventCard(props) {

    const walkCarbon = Math.round(props.distance * 0.058 / 2 * 100) / 100;
    const transportCarbon = Math.round(props.distance * 0.09133 * 100) / 100;
    const carpoolCarbon = Math.round(props.distance * 0.348 / 3 * 100) / 100;
    const carCarbon = Math.round(props.distance * 0.371 * 100) / 100;
    const planeCarbon = Math.round(props.distance * 24.0404 * 100) / 100;


    const [walkchecked, walksetChecked] = useState(false);
    const [buschecked, bussetChecked] = useState(false);
    const [carpoolchecked, carpoolwalksetChecked] = useState(false);
    const [carchecked, carsetChecked] = useState(false);
    const [planechecked, planeChecked] = useState(false);
    const [error, setError] = useState();
    const { currentUsername, setCurrentUsername } = useContext(UserContext);

    const handleAdd = async (e) => {
        try {
            var transportation = "";
            var carbonOffset = 0;

            if(walkchecked) {
                transportation = "Walk";
                carbonOffset = walkCarbon;
            }
            else if(buschecked) {
                transportation = "Public-Transportaion";
                carbonOffset = transportCarbon;
            }
            else if(carpoolchecked) {
                transportation = "Carpool";
                carbonOffset = carpoolCarbon;
            }
            else if(carchecked) {
                transportation = "Car";
                carbonOffset = carCarbon;
            }
            else if(planechecked) {
                transportation = "Plane";
                carbonOffset = planeCarbon;
            }

            const result = await axios.post("http://localhost:8000/add-event-to-user", {
                eventName: props.name,
                username: currentUsername,
                transportation: transportation,
                carbonOffset: carbonOffset,
                distance: props.distance
            });
            console.log(result);
            if(!result.data){
                alert("Event already added to!")
            }
            else{
                alert("Added event!")
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
    <div className="eventCardContainer"> 
        <div className="eventAttributesContainer">
            <div className="attributeLabel">{props.name}</div>
            <div className="attributeLabel">{props.address}</div>
            <div className="attributeLabel">{props.distance} miles away</div>
            <button onClick={handleAdd} className="loginElement">{props.going ? "Not going" : "I'm going!"}</button>
        </div>
        <div className="emissionsContainer">
            <div className="transportationContainer">
                <div className="colorCircle" id="walkCircle"></div>
                <div className="transportaionLabel">Walk</div>
                <div className="emissionLabel">{walkCarbon} kg</div>
                <div className="CO2Label">CO2</div>
                <input
                    type="checkbox"
                    id="location"
                    name="location"
                    checked={walkchecked}
                    onChange={e => walksetChecked(!walkchecked)}
                    className="checkBox"
                />
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="transportCircle"></div>
                <div className="transportaionLabel">Public transport</div>
                <div className="emissionLabel">{transportCarbon} kg</div>
                <div className="CO2Label">CO2</div>
                <input
                    type="checkbox"
                    id="location"
                    name="location"
                    checked={buschecked}
                    onChange={e => bussetChecked(!buschecked)}
                    className="checkBox"
                />
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="carpoolCircle"></div>
                <div className="transportaionLabel">Carpool</div>
                <div className="emissionLabel">{carpoolCarbon} kg</div>
                <div className="CO2Label">CO2</div>
                <input
                    type="checkbox"
                    id="location"
                    name="location"
                    checked={carpoolchecked}
                    onChange={e => carpoolwalksetChecked(!carpoolchecked)}
                    className="checkBox"
                />
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="carCircle"></div>
                <div className="transportaionLabel">Car</div>
                <div className="emissionLabel">{carCarbon} kg</div>
                <div className="CO2Label">CO2</div>
                <input
                    type="checkbox"
                    id="location"
                    name="location"
                    checked={carchecked}
                    onChange={e => carsetChecked(!carchecked)}
                    className="checkBox"
                />
            </div>
            <div className="transportationContainer">
                <div className="colorCircle" id="planeCircle"></div>
                <div className="transportaionLabel">Plane</div>
                <div className="emissionLabel">{planeCarbon} kg</div>
                <div className="CO2Label">CO2</div>
                <input
                    type="checkbox"
                    id="location"
                    name="location"
                    checked={planechecked}
                    onChange={e => planeChecked(!planechecked)}
                    className="checkBox"
                />
            </div>
        </div>
    </div>
    );
}

export default EventCard;