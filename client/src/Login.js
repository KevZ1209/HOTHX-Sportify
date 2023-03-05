import React, { useState, useContext } from "react";
import "./Login.css"
// import axios from "axios";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState();

    const register = async (e) => {
        e.preventDefault();
        try {
            const newUser = { email, password, username };
            console.log(newUser);
        //   await axios.post("http://localhost:5000/users/register", newUser);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
        //   const loginResponse = await axios.post(
        //     "http://localhost:5000/users/login",
        //     loginUser
        //   );
        //   setUserData({
        //     token: loginResponse.data.token,
        //     user: loginResponse.data.user,
        //   });
            console.log(loginUser)
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
      };
    

    return (
    <div>
        <h1>Login Page!</h1>
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
        <div className="loginBox">
            <p className="loginElement">Password</p>
            <input
                type="password"
                id="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        {isRegistering && (
            <div className="loginBox">
                <p className="loginElement">Username</p>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                />
            </div>)}
        <div className="loginBox">
            {isRegistering ?
                <button onClick={register} disabled={email === "" || password === "" || username === ""}>Register</button> :
                <button onClick={login} disabled={email === "" || password === ""}>Login</button>
            }    
        </div>
        <div>
            <button onClick={e => setIsRegistering(!isRegistering)}>{isRegistering ? "Already have an account? Click here to login" : "Don't have an account? Click here to register"}</button>
        </div>
    </div>
    );
}

export default LoginPage;