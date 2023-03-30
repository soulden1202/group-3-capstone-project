import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "../login/authSlice.js";
import { setUserInfo } from "../login/userSlice.js";
import { IsLoggedIn } from "../login/IsLoggedIn.js";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";

import { logInWithEmailAndPassword } from "../../firebase/firebaseClient.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
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
      "https://studentrentapi20230322222647.azurewebsites.net/api/Auth/login";

    //const apiUrl = "https://localhost:7228/api/Auth/login";

    logInWithEmailAndPassword(email, password);

    // const apiUrl = "https://localhost:7228/api/Auth/login";

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
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log(data);

        //Todo: Check if user has subcription or subscription expired
        //Todo: If expired then send a request to adjust account infor accordingly

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
        dispatch(
          setUserInfo({
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            accountType: data.accountType,
            user: data.user,
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
    console.log("Forgot password clicked");
  };

  const handleCheckLoggedIn = () => {
    console.log(`User is logged in: ${isLoggedIn}`);
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
                  className="text-gray-600 hover:text-gray-700"
                  onClick={handleForgotPassword}
                >
                  Forgot Password
                </button>
                <button
                  className="text-gray-600 hover:text-gray-700"
                  onClick={handleCheckLoggedIn}
                >
                  Am I logged in?
                </button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
