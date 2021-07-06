import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root"
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {

  let preloadedState = undefined;
  if (window.currentUserId) {
    preloadedState = {
      session: {
        currentUserId: window.currentUserId
      }
    };
  }
  window.store = configureStore(preloadedState)
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={window.store} />, root);
});