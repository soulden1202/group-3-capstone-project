import React, { useState } from "react";

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
        fetch("https://studentrentapi20230210185810.azurewebsites.net/api/Auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                return response.text();
            })
            .then((data) => {
                console.log(data);
                // handle successful login here
            })
            .catch((error) => {
                console.error(error);
                // handle login error here
            });
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto w-96">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4">Log In</h2>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Email:</span>
                            <input
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Password:</span>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </label>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>
                        <button
                            className="text-gray-600 hover:text-gray-700"
                            onClick={handleForgotPassword}
                        >
                            Forgot Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
