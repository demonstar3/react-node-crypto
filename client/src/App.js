import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearProfile } from "./actions/profileActions";
//COmponents
import Register from "./components/auth/Register";
import LoginForm from "./components/auth/Login";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import NotFound from "./components/notFound/NotFound";
import PageFooter from "./components/footer/Footer";
import Dashboard from "./components/dasboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  //Check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href = "login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {" "}
            <div className="content">
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={LoginForm} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
            <PageFooter />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
