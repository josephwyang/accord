import React from "react";
import { Link } from "react-router-dom";

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      birthYear: null,
      birthMonth: null,
      birthDay: null
    }
  }

  _stateParams() {
    const { birthDay, birthMonth, birthYear, ...stateParams } = this.state;
    stateParams.dateOfBirth = `${birthDay}/${birthMonth}/${birthYear}`;
    return stateParams;
  };

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postUser(this._stateParams())
      .then(() => this.props.history.push("/@me"));
  }

  render() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const selectMonth = (
      <select defaultValue="Select" onChange={this.handleInput("birthMonth")}>
        <option hidden disabled>Select</option>
        {[...Array(12).keys()].map(month => <option key={"month-" + (month + 1)} value={month + 1}>{months[month]}</option>)}
      </select>
    );

    const selectDay = (
      <select defaultValue="Select" onChange={this.handleInput("birthDay")}>
        <option hidden disabled>Select</option>
        {[...Array(31).keys()].map(day => <option key={"day-" + (day + 1)} value={day + 1}>{day + 1}</option>)}
      </select>
    );

    const earliestYear = new Date().getFullYear() - 3;

    const selectYear = (
      <select defaultValue="Select" onChange={this.handleInput("birthYear")}>
        <option hidden disabled>Select</option>
        {[...Array(150).keys()].map(year => <option key={"year-" + (earliestYear - year)} value={earliestYear - year}>{earliestYear - year}</option>)}
      </select>
    );
    
    return (
      <div id="sign-up-form">
        <div className="background">
          <img id="toon-left" src={window.toonLeft} alt="toon-left" />
        </div>
        <div className="user-form">
          <h1>Create an account</h1>
          <form>
            <label htmlFor="email">EMAIL</label>
            <input id="email" type="text" value={this.state.email} onChange={this.handleInput("email")} />
            <label htmlFor="username">USERNAME</label>
            <input id="username" type="text" value={this.state.username} onChange={this.handleInput("username")} />
            <label htmlFor="password">PASSWORD</label>
            <input id="password" type="password" value={this.state.password} onChange={this.handleInput("password")} />
            <label htmlFor="date-of-birth">DATE OF BIRTH</label>
            <div id="date-of-birth">
              {selectMonth}
              {selectDay}
              {selectYear}
            </div>
            <button onClick={this.handleSubmit.bind(this)}>Continue</button>
          </form>
          <Link to="/login">Already have an account?</Link>
          {this.props.errors}
        </div>
      </div>
    );
  }
};