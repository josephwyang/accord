import React from "react";

const Bubble = props => {
  const directionStyle = (props.top ? {
    flexDirection: "column",
    top: props.top,
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    left: props.left,
    top: (props.y ? `${props.y}px` : "50%"),
    transform: "translateY(-50%)"
  });

  directionStyle["display"] = (props.show ? "flex" : "");

  const sizeStyle = (props.large ? {
    padding: "8px 11px",
    fontSize: "15px",
    letterSpacing: "0.2px",
    borderRadius: "5px"
  } : {
    padding: "7px 9px",
    fontSize: "13px",
    borderRadius: "3px"
  });
  
  return (
    <div className="bubble" style={{ ...directionStyle, opacity: props.opacity }}>
      <p style={{ ...sizeStyle, order: (props.left ? 2 : null), boxShadow: (props.top ? "0px 2px 5px #292B2F" : null) }}>{props.text}</p>
      <div className={props.left ? "arrow arrow-left" : "arrow arrow-down"}
        style={{ order: (props.left ? 1 : null) }}></div>
    </div>
  )
}

export default Bubble;