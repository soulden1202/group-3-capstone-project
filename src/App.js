import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  ContactPage,
  LoginPage,
  PropertyPage,
  AboutPage,
  SignupPage,
} from "./containers";

import { NavBar } from "./components";

const App = () => {
  return (
    <>
      <NavBar className="flex relative w-full "></NavBar>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/property" element={<PropertyPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
