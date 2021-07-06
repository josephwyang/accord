import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router";

const mSTP = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

const Auth = ({ loggedIn, path, exact, component: Component }) => (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? <Redirect to="/" /> : <Component {...props} />)} />
);

const Protected = ({ loggedIn, path, exact, component: Component }) => (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? <Component {...props} /> : <Redirect to="/login" />
  )} />
)

export const AuthRoute = withRouter(connect(mSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP)(Protected));