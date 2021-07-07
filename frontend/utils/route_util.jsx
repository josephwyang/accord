import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router";

const mSTP = state =>{
  return ({
  loggedIn: Boolean(state.session.currentUserId)
})};

const Auth = ({ loggedIn, path, exact, component: Component }) => {
  return (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? <Redirect to="/" /> : <Component {...props} />)} />
)};

const Protected = ({ loggedIn, path, exact, component: Component }) => {
  return (
  <Route path={path} exact={exact} render={props => (
    loggedIn ? <Component {...props} /> : <Redirect to="/login" />
  )} />
)};

export const AuthRoute = withRouter(connect(mSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP)(Protected));