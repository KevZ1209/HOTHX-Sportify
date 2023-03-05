import React from "react";
import { BrowserRouter,Routes, Route, NavLink } from 'react-router-dom';
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";

function App() {
	return (
    <BrowserRouter>
      <NavLink
        to="/"
        style={{ textDecoration: "none", marginRight: "0.5rem" }}
        disableRipple
      >
        <div>HOME</div>
      </NavLink>
      <NavLink
        to="/profile"
        style={{ textDecoration: "none", marginRight: "0.5rem" }}
        disableRipple
      >
        <div>PROFILE</div>
      </NavLink>
      <NavLink
        to="/leaderboard"
        style={{ textDecoration: "none", marginRight: "0.5rem" }}
        disableRipple
      >
        <div>LEADERBOARD</div>
      </NavLink>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/leaderboard" element={<LeaderboardPage/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;