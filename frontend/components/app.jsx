import React from "react";
import { Route, Switch } from "react-router";
import { AuthRoute } from "../utils/route_util";
import SplashContainer from "./splash/splash_container";
import SignUpFormContainer from "./session/sign_up_form_container";
import LogInFormContainer from "./session/log_in_form_container";

const App = () => (
  <div id="app">
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <AuthRoute path="/signup" component={SignUpFormContainer} />
      <AuthRoute path="/login" component={LogInFormContainer} />
    </Switch>
  </div>
);

export default App;