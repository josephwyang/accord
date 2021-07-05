import React from "react";
import { Route } from "react-router";
import UsersNavContainer from "./users/users_nav_container"
import SignUpFormContainer from "./session/sign_up_form_container";

const App = () => (
  <div id="app">
    <Route path="/signup" component={SignUpFormContainer} />
    <Route path="/" component={UsersNavContainer} />
  </div>
);

export default App;