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

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.logInUser(this.state);
  }

  render() {
    return (
      <div className="login-user-form">
        <h1>Welcome back!</h1>
        <h2>We're so excited to see you again!</h2>

        <form>
          <label htmlFor="identifier">EMAIL OR PHONE NUMBER</label>
          <input id="identifier" type="text" value={this.state.identifier} onChange={this.handleInput("identifier")} />

          <label htmlFor="password">PASSWORD</label>
          <input id="password" type="password" value={this.state.password} onChange={this.handleInput("password")} />

          <button onClick={this.handleSubmit.bind(this)}>Login</button>
        </form>

        <p>Need an account?</p>
        <Link to="/signup">Register</Link>
        
        {this.props.errors}
      </div>
    );
  }
};