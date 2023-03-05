import React, { useEffect, useState } from "react";
import "./LeaderboardPage.css";

function LeaderboardPage() {
    var leaderboardList = [];
    var [sortByType, setSortByType] = useState("ratio");
    var [sortStatus, setSortStatus] = useState(0);

    function orderBy(prop, largest) {
        for(var i = 0; i < leaderboardList.length - 1; i++) {
            var changeIndex = i;
            if(prop == "miles") {
                var changeValue = getTotalMiles(leaderboardList[i]);
            } else if(prop == "emissions") {
                var changeValue = getTotalEmissions(leaderboardList[i]);
            } else {
                var changeValue = getRatio(leaderboardList[i]);
            }
            for(var j = i+1; j < leaderboardList.length; j++) {
              if(largest == 0) {
                if(leaderboardList[j].emissions > changeValue) {
                    if(prop == "miles") {
                        var changeValue = getTotalMiles(leaderboardList[j]);
                    } else if(prop == "emissions") {
                        var changeValue = getTotalEmissions(leaderboardList[j]);
                    } else {
                        var changeValue = getRatio(leaderboardList[j]);
                    }
                    changeIndex = j;
                  }
              } else {
                if(leaderboardList[j].emissions < changeValue) {
                    if(prop == "miles") {
                        var changeValue = getTotalMiles(leaderboardList[j]);
                    } else if(prop == "emissions") {
                        var changeValue = getTotalEmissions(leaderboardList[j]);
                    } else {
                        var changeValue = getRatio(leaderboardList[j]);
                    }
                    changeIndex = j;
                  }
              }
            }
            var temp = changeValue;
            leaderboardList[changeIndex] = leaderboardList[i];
            leaderboardList[i] = temp;
        }
    }
    
    /*function sortByEmissions(descending) {
        for(var i = 0; i < leaderboardList.length - 1; i++) {
            var changeIndex = i;
            var changeValue = getEmissions(leaderboardList[i]);
            for(var j = i+1; j < leaderboardList.length; j++) {
              if(descending) {
                if(leaderboardList[j].emissions > changeValue) {
                    changeValue = getEmissions(leaderboardList[j]);
                    changeIndex = j;
                  }
              } else {
                if(leaderboardList[j].emissions < changeValue) {
                    changeValue = getEmissions(leaderboardList[j]);
                    changeIndex = j;
                  }
              }
            }
            var temp = changeValue;
            leaderboardList[changeIndex] = leaderboardList[i];
            leaderboardList[i] = temp;
        }
    }

    function sortByMiles(descending) {
        for(var i = 0; i < leaderboardList.length - 1; i++) {
            var changeIndex = i;
            var changeValue = getMiles(leaderboardList[i]);
            for(var j = i+1; j < leaderboardList.length; j++) {
              if(descending) {
                if(leaderboardList[j].emissions > changeValue) {
                    changeValue = getMiles(leaderboardList[j]);
                    changeIndex = j;
                  }
              } else {
                if(leaderboardList[j].emissions < changeValue) {
                    changeValue = getMiles(leaderboardList[j]);
                    changeIndex = j;
                  }
              }
            }
            var temp = changeValue;
            leaderboardList[changeIndex] = leaderboardList[i];
            leaderboardList[i] = temp;
        }
    }

    function sortByRatio(descending) {
        for(var i = 0; i < leaderboardList.length - 1; i++) {
            var changeIndex = i;
            var changeValue = getRatio(leaderboardList[i]);
            for(var j = i+1; j < leaderboardList.length; j++) {
              if(descending) {
                if(leaderboardList[j].emissions > changeValue) {
                    changeValue = getRatio(leaderboardList[j]);
                    changeIndex = j;
                  }
              } else {
                if(leaderboardList[j].emissions < changeValue) {
                    changeValue = getRatio(leaderboardList[i]);
                    changeIndex = j;
                  }
              }
            }
            var temp = changeValue;
            leaderboardList[changeIndex] = leaderboardList[i];
            leaderboardList[i] = temp;
        }
    }*/

    /*function orderBy(prop, largest) {
        if(largest == 0) {
            return function (a, b) {
                a = a[prop];
                b = b[prop];
              return a < b ? -1 : a > b ? 1 : 0;
            };
          } else {
            return function (a, b) {
                a = a[prop];
                b = b[prop];
              return a > b ? -1 : a < b ? 1 : 0;
            };
          }
    }*/

    function sortBy(type) {
        if(sortByType == type && sortStatus < 2) {
            orderBy(type,sortStatus);
            setSortStatus(sortStatus + 1);
        } else if(sortByType == type && sortStatus == 2) {
            orderBy("ratio", sortStatus)
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
      }, []);

    return (
    <div id="leaderboard">
        <h1>LeaderBoard</h1>
        <div>
          <table id="leaderboard-table">
            <thead>
              <th>Username</th>
              <th onClick={e => sortBy('ratio')}>Carbon Emissions / Miles Traveled {sortByType == 'ratio' && sortStatus == 1 && <span>{"\u2191"}</span>}{sortByType == 'ratio' && sortStatus == 2 && <span>{"\u2193"}</span>}</th>
              <th onClick={e => sortBy('emissions')}>Carbon Emissions {sortByType == 'emissions' && sortStatus == 1 && <span>{"\u2191"}</span>}{sortByType == 'emissions' && sortStatus == 2 && <span>{"\u2193"}</span>}</th>
              <th onClick={e => sortBy('miles')}>Miles Traveled {sortByType == 'miles' && sortStatus == 1 && <span>{"\u2191"}</span>}{sortByType == 'miles' && sortStatus == 2 && <span>{"\u2193"}</span>}</th>
            </thead>
            <tbody>
              <tr>
                <td>marcuscheng123</td>
                <td>102</td>
                <td>384823</td>
                <td>83842</td>
              </tr>
              <tr>
                <td>novakdjokovic22</td>
                <td>84</td>
                <td>384894732984823</td>
                <td>82</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    );
}

export default LeaderboardPage;