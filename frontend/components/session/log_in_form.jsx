import React from "react";
import { Link } from "react-router-dom";

export default class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: ""
    }
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.logInUser(this.state)
      .then(data => this.props.history.push(data.currentUser.lastPathVisited));
  }

  handleDemoLogin(e) {
    e.preventDefault();
    this.props.logInUser({identifier: "demo@user.com", password: "123456"})
      .then(data => this.props.history.push(data.currentUser.lastPathVisited));
  }

  showErrors() {
    const errors = this.props.errors;

    for (const key in errors) {
      if (errors[key].includes("Login")) { return <span>- {errors[key]}</span> };
    };

    return <></>;
  };

  render() {
    const errors = this.props.errors;

    const error = this.showErrors();
    const hasError = (error.type === "span" ? "hasError" : "");

    return (
      <div id="log-in-form">
        <img className="background" src={window.background} alt="background" />
        <div className="user-form">
          <h1>Welcome back!</h1>
          <h2>We're so excited to see you again!</h2>
          <form>
            <label className={hasError} htmlFor="identifier">EMAIL OR PHONE NUMBER {error}</label>
            <input id="identifier" type="text" value={this.state.identifier} onChange={this.handleInput("identifier")} />
            <label className={hasError} htmlFor="password">PASSWORD {error}</label>
            <input id="password" type="password" value={this.state.password} onChange={this.handleInput("password")} />
            <button onClick={this.handleSubmit.bind(this)}>Login</button>
            <button id="demo-user" onClick={this.handleDemoLogin.bind(this)}>Demo User</button>
          </form>
          <p>Need an account?</p>
          <Link to="/signup">Register</Link>
      
        </div>
      </div>
    );
  }
};