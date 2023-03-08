import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./login/store";
import { AboutPage, ContactPage, HomePage, LoginPage, PropertyPage, SignupPage } from "./containers";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/property/:id" component={PropertyPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);
