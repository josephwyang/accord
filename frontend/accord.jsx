import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root"
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {

  let preloadedState = undefined;
  if (window.currentUser) {
    preloadedState = {
      session: {
        currentUserId: window.currentUser.id
      }
    };
  }

  $('#root').append('<div style="width:100%;height:' + document.documentElement.scrollHeight + 'px;position: absolute;top: 0;"></div>')

  window.store = configureStore(preloadedState)
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={window.store} />, root);
});