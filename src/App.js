import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import HomePage from "./containers/home/Home";
import ContactPage from "./containers/contact/Contact";
import LoginPage from "./containers/login/Login";
import PropertyPage from "./containers/property/Property";
import AboutPage from "./containers/about/About";
import SignupPage from "./containers/signup/Signup";
import UserPage from "./containers/user/UserPage";
import PropretyById from "./containers/property/PropretyById";
import UploadProperty from "./containers/property/UploadProperty";
import PropPortfolio from "./containers/property/PropPortfolio";
import Pricing from "./containers/pricing/Pricing";
import { NavBar } from "./components";
import store from "./containers/login/store";
import UpdateProperty from "./containers/property/UpdateProperty";

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
                <Route exact path="/property/:userId" element={<PropretyById />} />
                <Route exact path="/user/:userId/PropPortfolio" element={<PropPortfolio />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route exact path="/user/:userId" element={<UserPage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route
                    exact
                    path="/user/:userId/UploadProperty"
                    element={<UploadProperty />}
                />
                <Route path="/UpdateProperty/:propertyId" element={<UpdateProperty />} />
            </Routes>
        </Provider>
    );

};

export default App;