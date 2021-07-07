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

  showErrors(field) {
    const fieldErrors = this.props.errors.filter(error => error.includes(field.charAt(0).toUpperCase() + field.slice(1)));
    
    for (let error of fieldErrors) {
      if (error.includes("blank") || (field === "Password" && !this.state.password))
        { return <span>- This field is required</span> };
    };
    
    if (fieldErrors.length) {
      const errorMsg = fieldErrors[0].slice(field.length + 1);
      return <span>{`-  ${errorMsg[0].toUpperCase()}${errorMsg.slice(1)}`}</span>;
    };

    return <></>;
  };

  hasError(error) {
    return (error.type === "span" ? " hasError" : "");
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

    const emailError = this.showErrors("Email");
    const usernameError = this.showErrors("Username");
    const passwordError = this.showErrors("Password");
    const dateOfBirthError = this.showErrors("Date of birth");

    return (
      <div id="sign-up-form">
        <div className="background">
          <img class="toon-left" src={window.toonLeft} alt="toon-left" />
        </div>
        <div className="user-form">
          <h1>Create an account</h1>
          <form>
            <label className={this.hasError(emailError)} htmlFor="email">EMAIL {emailError}</label>
            <input id="email" type="text" value={this.state.email} onChange={this.handleInput("email")} />
            <label className={this.hasError(usernameError)} htmlFor="username">USERNAME {usernameError}</label>
            <input id="username" type="text" value={this.state.username} onChange={this.handleInput("username")} />
            <label className={this.hasError(passwordError)} htmlFor="password">PASSWORD {passwordError}</label>
            <input id="password" type="password" value={this.state.password} onChange={this.handleInput("password")} />
            <label className={this.hasError(dateOfBirthError)} htmlFor="date-of-birth">DATE OF BIRTH {dateOfBirthError}</label>
            <div id="date-of-birth">
              {selectMonth}
              {selectDay}
              {selectYear}
            </div>
            <button onClick={this.handleSubmit.bind(this)}>Continue</button>
          </form>
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    );
  }
};