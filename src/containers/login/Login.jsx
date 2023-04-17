import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "../login/authSlice.js";
import { setUserInfo } from "../login/userSlice.js";
import { IsLoggedIn } from "../login/IsLoggedIn.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { logInWithEmailAndPassword , resetPassword} from "../../firebase/firebaseClient.jsx";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const isLoggedIn = IsLoggedIn();

    let navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        if (user.id !== null) {
            navigate("/");
        }

        document.title = "Login - Livin it";
    }, [user.id, navigate]);

    const handleLogin = () => {
        const apiUrl =
            "https://studentrentapi20230411081843.azurewebsites.net/api/Auth/login";

        //const apiUrl = "https://localhost:7228/api/Auth/login";

        logInWithEmailAndPassword(email, password);

        setloading(true);
        fetch(apiUrl, {
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
                if (response.ok) {
                    return response.json();
                } else {
                    setloading(false);
                    throw new Error("Login failed");
                }
            })
            .then((data) => {
                console.log(data.watchList);

                const { accessToken, refreshToken } = data;
                dispatch(setTokens({ accessToken, refreshToken }));
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("id", data.id);
                localStorage.setItem("firstName", data.firstName);
                localStorage.setItem("lastName", data.lastName);
                localStorage.setItem("email", data.email);
                localStorage.setItem("accountType", data.accountType);
                localStorage.setItem("user", data.user);
                localStorage.setItem("properties", data.properties);
                localStorage.setItem("watchList", JSON.stringify(data.watchList));

                dispatch(
                    setUserInfo({
                        id: data.id,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        accountType: data.accountType,
                        user: data.user,
                        properties: data.properties,
                        watchList: data.watchList,
                    })
                );
                setloading(false);
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                // handle login error here
            });
    };

    const handleForgotPassword = () => {
        resetPassword(email)
            .then(() => {
                setShowForgotPasswordModal(false);
                alert(
                    "Password reset email sent. Please check your email and follow the instructions to reset your password."
                );
            })
            .catch((error) => {
                console.error(error);
                // handle password reset error here
            });
    };


    const handleCloseForgotPasswordModal = () => {
        setShowForgotPasswordModal(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto w-96">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    {!loading ? (
                        <>
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
                                    className="text-gray-600 hover:text-gray-700 float-right"
                                    onClick={() => setShowForgotPasswordModal(true)}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-full h-full items-center justify-center">
                            <BallTriangle
                                height={100}
                                width={100}
                                radius={4}
                                color="#ADD8E6"
                                ariaLabel="ball-triangle-loading"
                                wrapperClass={{}}
                                wrapperStyle=""
                                visible={true}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showForgotPasswordModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                        <div className="relative bg-white rounded-lg w-96">
                            <div className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-800 cursor-pointer" onClick={() => setShowForgotPasswordModal(false)}>
                                X
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
                                <p className="text-gray-700 mb-4">
                                    Enter the email address associated with your account, and we'll email you a link to reset your password.
                                </p>
                                <label className="block">
                                    <span className="text-gray-700">Email:</span>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </label>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
                                    onClick={handleForgotPassword}
                                >
                                    Send Reset Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Login;