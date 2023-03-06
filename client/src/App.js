import React, { useState} from "react";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";
import LoginPage from "./Login";
import UserContext from "./UserContext";
import './App.css';

function App() {
  const [currentUsername, setCurrentUsername] = useState(null);

	return (
    <BrowserRouter>
      <UserContext.Provider value={{currentUsername, setCurrentUsername}}>
        {currentUsername && (
          <div className="navBar">
            <NavLink
              to="/"
              style={{ textDecoration: "none", marginRight: "0.5rem" }}
              className="navButton"
            >
              <div>Home</div>
            </NavLink>
            <NavLink
              to="/profile"
              style={{ textDecoration: "none", marginRight: "0.5rem" }}
              className="navButton"
            >
              <div>Profile</div>
            </NavLink>
            <NavLink
              to="/leaderboard"
              style={{ textDecoration: "none", marginRight: "0.5rem" }}
              className="navButton"
            >
              <div>Leaderboard</div>
            </NavLink>
            <NavLink
              to="/login"
              style={{ textDecoration: "none", marginRight: "0.5rem" }}
              className="navButton"
            >
              <div>Login</div>
            </NavLink>
          </div>
        )}
        <Routes>
          <Route exact path="/" element={currentUsername ? <HomePage/> : <LoginPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/leaderboard" element={<LeaderboardPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;