import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("");

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
        fetch('https://studentrentapi20230210185810.azurewebsites.net/api/Auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                email: email,
                password: password,
                AccountType: accountType
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
                if (data.includes("Account created and added to Firestore")) {
                    // handle successful signup here
                } else {
                    // handle signup error here
                    console.log("Signup failed");
                }
            })
            .catch(error => {
                console.error(error);
                // handle signup error here
            });
    };



    return (
        <div className="signup-container">
            <div className="form-container">
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={handleFirstNameChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                </label>
                <br />
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
                <label>
                    Account Type:
                    <select value={accountType} onChange={handleAccountTypeChange}>
                        <option value="">Select Account Type</option>
                        <option value="Renter">Renter</option>
                        <option value="Property Owner">Property Owner</option>
                    </select>
                </label>
                <br />
                <button className="signup-button" onClick={handleSignup}>Create Account</button>
            </div>
        </div>
    );
};

export default Signup;
