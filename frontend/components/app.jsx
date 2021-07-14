import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../utils/route_util";
import SplashContainer from "./splash/splash_container";
import SignUpFormContainer from "./session/sign_up_form_container";
import LogInFormContainer from "./session/log_in_form_container";
import { Redirect } from "react-router-dom";
import ServersIndexContainer from "./servers/servers_index_container";
import ServersExploreContainer from "./servers/servers_explore_container";
import ServerContainer from "./servers/server_container";

const App = () => (
  <div id="app">
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <AuthRoute path="/signup" component={SignUpFormContainer} />
      <AuthRoute path="/login" component={LogInFormContainer} />
      <ProtectedRoute path="/channels/:serverId/:channelId" render={props => (
        <>
          <ServersIndexContainer {...props}/>
          <ServerContainer {...props} />
        </>
        )} />
      <ProtectedRoute path="/channels/:serverId/" render={props => (
        <>
          <ServersIndexContainer {...props} />
          <ServerContainer {...props} />
        </>
      )} />
      <ProtectedRoute path="/explore" component={ServersExploreContainer} />
      {/* <Route render={() => <Redirect to="/" />} /> */}
    </Switch>
  </div>
);

export default App;