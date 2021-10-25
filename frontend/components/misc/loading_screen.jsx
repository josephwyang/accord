import React from "react";

const LoadingScreen = ({ loading }) => {
  return loading ?
    <div className="loading">
      <img src={window.logo} alt="ACCORD" />
    </div>
  : null
};

export default LoadingScreen;