import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import HomePage from "./containers/home/Home";
import ContactPage from "./containers/contact/Contact";
import LoginPage from "./containers/login/Login";
import PropertyPage from "./containers/property/Property";
import AboutPage from "./containers/about/About";
import SignupPage from "./containers/signup/Signup";


import { NavBar } from "./components";
import store from "./containers/login/store";

const App = () => {
    return (
        <Provider store={store}>
            <NavBar className="flex relative w-full "></NavBar>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/property" element={<PropertyPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Provider>
    );
};

export default App;
