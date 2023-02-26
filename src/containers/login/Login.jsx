import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        fetch('https://studentrentapi20230210185810.azurewebsites.net/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // handle successful login here
            })
            .catch(error => {
                console.error(error);
                // handle login error here
            });
    };


    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <label>
                    Email:
                    <input type="text" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button className="login-button" onClick={handleLogin}>Log In</button>
                <button className="forgot-password-button" onClick={handleForgotPassword}>Forgot Password</button>
            </div>
        </div>
    );
};

export default Login;
