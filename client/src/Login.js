import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import "./Login.css"
import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState();
    const { currentUsername, setCurrentUsername } = useContext(UserContext);


    const register = async (e) => {
        e.preventDefault();
        try {
            console.log(username, password, email);
            const result = await axios.post("http://localhost:8000/create-user/"+username+"/"+password+"/"+email);
            if(!result.data) {
                alert("Username already exists!")
            }
            else {
                setIsRegistering(false)
            }
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/check-password/"+username+"/"+password);
            if(!result.data) {
                alert("Username or password incorrect!")
            }
            else {
                console.log("Logged in!")
                setCurrentUsername(username)
            }
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const logout = async (e) => {
        setCurrentUsername(null)
    }

    return (
    <div>
        <h1>Login Page!</h1>
        {currentUsername ? (
            <>
                <div className="loginBox">
                    <div className="loginElement">You are already logged in</div>
                    <button onClick={logout} className="loginElement">Logout</button>
                </div>
            </>
        ) : (
            <>
                <div className="loginBox">
                    <p className="loginElement">Username</p>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                        className="loginElement"
                    />
                </div>
                <div className="loginBox">
                    <p className="loginElement">Password</p>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        className="loginElement"
                    />
                </div>
                {isRegistering && (
                    <div className="loginBox">
                        <p className="loginElement">Email</p>
                        <input
                            className="loginElement"
                            type="text"
                            id="email"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                )}
                <div className="loginBox">
                    {isRegistering ?
                        <button onClick={register} disabled={email === "" || password === "" || username === ""} className="loginElement">Register</button> :
                        <button onClick={login} disabled={username === "" || password === ""} className="loginElement">Login</button>
                    }    
                </div>
                <div>
                    <button onClick={e => setIsRegistering(!isRegistering)} className="loginElement">{isRegistering ? "Already have an account? Click here to login" : "Don't have an account? Click here to register"}</button>
                </div>
            </>
        )}      
        </div>
            
    );
}

export default LoginPage;