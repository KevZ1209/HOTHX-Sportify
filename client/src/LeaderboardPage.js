import React, { useEffect, useState } from "react";
import "./LeaderboardPage.css";
import axios from "axios";

function LeaderboardPage() {
    var [leaderboardList, setLeaderboardList] = useState([]);

     useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://localhost:8000/get-all-users");
            console.log(result);
            if(result.data) {
                setLeaderboardList(result.data);
            }
        }
        fetchData();
    }, []);

    var [sortByType, setSortByType] = useState("ratio");
    var [sortStatus, setSortStatus] = useState(0);

    function orderBy(prop, largest) {
        console.log(leaderboardList);
        for(var i = 0; i < leaderboardList.length-1; i++) {
            var changeValue = 0;
            var changeIndex = i;
            if(prop === "miles") {
                changeValue = getTotalMiles(leaderboardList[i]);
            } else if(prop === "emissions") {
                changeValue = getTotalEmissions(leaderboardList[i]);
            } else {
                changeValue = getRatio(leaderboardList[i]);
            }
            for(var j = i+1; j < leaderboardList.length; j++) {
              if(largest === 0) {
                    if(prop === "miles" && getTotalMiles(leaderboardList[j]) > changeValue) {
                        changeValue = getTotalMiles(leaderboardList[j]);
                        changeIndex = j;
                    } else if(prop === "emissions" &&  getTotalEmissions(leaderboardList[j]) > changeValue) {
                        changeValue = getTotalEmissions(leaderboardList[j]);
                        changeIndex = j;
                    } else if(prop === "ratio" &&  getRatio(leaderboardList[j]) > changeValue) {
                        console.log(390423);
                        changeValue = getRatio(leaderboardList[j]);
                        changeIndex = j;
                    }
              } else {
                    if(prop === "miles" && getTotalMiles(leaderboardList[j]) < changeValue) {
                        changeValue = getTotalMiles(leaderboardList[j]);
                        changeIndex = j;
                    } else if(prop === "emissions" &&  getTotalEmissions(leaderboardList[j]) < changeValue) {
                        changeValue = getTotalEmissions(leaderboardList[j]);
                        changeIndex = j;
                    } else if(prop === "ratio" &&  getRatio(leaderboardList[j]) < changeValue) {
                        changeValue = getRatio(leaderboardList[j]);
                        changeIndex = j;
                    }
              }
            }
            console.log(i);
            console.log(changeIndex);
            var temp = leaderboardList[changeIndex];
            let listCopy = JSON.parse(JSON.stringify(leaderboardList));
            console.log(leaderboardList);
            console.log(listCopy);
            listCopy[changeIndex] = listCopy[i];
            listCopy[i] = temp;
            console.log(listCopy);
            setLeaderboardList(listCopy);
            console.log(leaderboardList);
        }
    }

    function sortBy(type) {
        if(sortByType === type && sortStatus < 2) {
            orderBy(type,sortStatus);
            setSortStatus(sortStatus + 1);
        } else if(sortByType === type && sortStatus === 2) {
            orderBy("ratio", sortStatus);
            setSortStatus(0);
        } else {
            setSortByType(type);
            orderBy(type,0);
            setSortStatus(1);
        }
    }

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

    function getRatio(user) {
        return 1.0 * getTotalEmissions(user) / getTotalMiles(user);
    }

    useEffect(() => {
        sortBy('ratio');
        setSortStatus(0);
      }, [leaderboardList]);

    return (
    <div id="leaderboard">
        <h1>LeaderBoard</h1>
        <div>
          <table id="leaderboard-table">
            <thead>
              <th>Username</th>
              <th>Carbon Emissions / Miles Traveled {sortByType === 'ratio' && sortStatus === 1 && <span>{"\u2191"}</span>}{sortByType === 'ratio' && sortStatus === 2 && <span>{"\u2193"}</span>}</th>
              <th>Carbon Emissions {sortByType === 'emissions' && sortStatus === 1 && <span>{"\u2191"}</span>}{sortByType === 'emissions' && sortStatus === 2 && <span>{"\u2193"}</span>}</th>
              <th>Miles Traveled {sortByType === 'miles' && sortStatus === 1 && <span>{"\u2191"}</span>}{sortByType === 'miles' && sortStatus === 2 && <span>{"\u2193"}</span>}</th>
            </thead>
            <tbody>
            {leaderboardList.map((user) => 
            <tr>
              <td>{user.username}</td>
              <td>{getRatio(user)}</td>
              <td>{getTotalEmissions(user)}</td>
              <td>{getTotalMiles(user)}</td>
            </tr>
            )}  
            </tbody>
          </table>
        </div>
    </div>
    );
}

export default LeaderboardPage;