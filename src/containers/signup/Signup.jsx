import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [dataReturned, setdataReturned] = useState(false);
  const [error, seterror] = useState("");

  useEffect(() => {
    document.title = "Sign up - Livin it";
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };

    const handleSignup = () => {
        if (accountType === "") {
            seterror("Must Select Account Type");
            return;
        }

        setloading(true);
        setdataReturned(false);

        fetch(
            "https://studentrentapi20230322222647.azurewebsites.net/api/Auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ID: "ignore this",
                    FirstName: firstName,
                    LastName: lastName,
                    email: email,
                    password: password,
                    AccountType: accountType,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    setloading(false);
                    seterror("Account Already Exists");
                    setdataReturned(true);
                    setsuccess(false);
                } else {
                    setloading(false);
                    setdataReturned(true);
                    setsuccess(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <fieldset disabled={loading}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="accountType"
                >
                  Account Type:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="accountType"
                  value={accountType}
                  onChange={handleAccountTypeChange}
                >
                  <option value="">Select an account type</option>
                  <option value="Renter">Renter</option>
                  <option value="Property Owner">Property Owner</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                {loading ? (
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
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </button>
                )}
              </div>
              {dataReturned && (
                <div>
                  {success ? (
                    <p className="text-green-500">
                      Account Created Successfully
                    </p>
                  ) : (
                    <p className="text-red-500">{error}</p>
                  )}
                </div>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
