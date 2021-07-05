import React from "react";

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      birthYear: "",
      birthMonth: "",
      birthDay: ""
    }
  }

  handleInput(type) {
    return e => this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postUser(this.state);
  }

  render() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const selectMonth = (
      <select id="date-of-birth" defaultValue="Select">
        <option hidden disabled>Select</option>
        {[...Array(12).keys()].map(month => <option key={"month-" + (month + 1)} value={month + 1}>{month + 1}</option>)}
      </select>
    );

    const selectDay = (
      <select defaultValue="Select">
        <option hidden disabled>Select</option>
        {[...Array(31).keys()].map(day => <option key={"day-" + (day + 1)} value={day + 1}>{day + 1}</option>)}
      </select>
    );

    const earliestYear = new Date().getFullYear() - 152;

    const selectYear = (
      <select defaultValue="Select">
        <option hidden disabled>Select</option>
        {[...Array(150).keys()].map(year => <option key={"year-" + (year + earliestYear)} value={year + earliestYear}>{year + earliestYear}</option>)}
      </select>
    );
    
    return (
      <div className="user-form">
        <h2>Create an account</h2>
        <form>
          <label htmlFor="email">EMAIL</label>
          <input id="email" type="text" value={this.state.email} onChange={this.handleInput("email")} />

          <label htmlFor="username">USERNAME</label>
          <input id="username" type="text" value={this.state.username} onChange={this.handleInput("username")} />

          <label htmlFor="password">PASSWORD</label>
          <input id="password" type="password" value={this.state.password} onChange={this.handleInput("password")} />

          <label htmlFor="date-of-birth">DATE OF BIRTH</label>
          {selectMonth}
          {selectDay}
          {selectYear}

          <button onClick={this.handleSubmit.bind(this)}>Continue</button>
        </form>
        {this.props.errors}
      </div>
    );
  }
};