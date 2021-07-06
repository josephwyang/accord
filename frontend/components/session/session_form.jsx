import React from "react";

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
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
    if (birthDay && birthMonth && birthYear) {
      stateParams.dateOfBirth = `${birthDay}/${birthMonth}/${birthYear}`;
    };
    return stateParams;
  };

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this._stateParams());
  }

  render() {
    const identifier = this.props.title === "Welcome back!" ? (
      <>
        <label htmlFor="identifier">EMAIL OR PHONE NUMBER</label><br />
        <input id="identifier" type="text" value={this.state.identifier} onChange={this.handleInput("identifier")} /><br />
      </>
    ) : (
      <>
        <label htmlFor="email">EMAIL</label><br />
        <input id="email" type="text" value={this.state.email} onChange={this.handleInput("email")} /><br />

        <label htmlFor="username">USERNAME</label><br />
        <input id="username" type="text" value={this.state.username} onChange={this.handleInput("username")} /><br />
      </>
    );

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const selectMonth = (
      <select id="date-of-birth" defaultValue="Select" onChange={this.handleInput("birthMonth")}>
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

    const dateOfBirthInput = this.props.title === "Welcome back!" ? (
      <></>
    ) : (
        <>
          <label htmlFor="date-of-birth">DATE OF BIRTH</label><br />
          {selectMonth}
          {selectDay}
          {selectYear}<br />
        </>
    );
    
    return (
      <div className="user-form">
        <h1>{this.props.title}</h1>
        <h2>{this.props.subheader}</h2>

        <form>
          {identifier}

          <label htmlFor="password">PASSWORD</label><br />
          <input id="password" type="password" value={this.state.password} onChange={this.handleInput("password")} /><br />

          {dateOfBirthInput}

          <button onClick={this.handleSubmit.bind(this)}>{this.props.buttonLabel}</button>
        </form>
        {this.props.errors}
      </div>
    );
  }
};